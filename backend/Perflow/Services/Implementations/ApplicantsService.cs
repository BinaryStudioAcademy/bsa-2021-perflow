﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Applicants;
using Perflow.DataAccess.Context;
using Perflow.Domain.Enums;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using Shared.ExceptionsHandler.Exceptions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Shared.Auth;
using Perflow.Common.DTO.Notifications;

namespace Perflow.Services.Implementations
{
    public class ApplicantsService : BaseService
    {
        private readonly IImageService _imageService;
        private readonly INotificationService _notificationService;

        public ApplicantsService(PerflowContext context, IMapper mapper, IImageService imageService, 
            INotificationService notificationService)
            : base(context, mapper)
        {
            _imageService = imageService;
            _notificationService = notificationService;
        }


        public async Task<IEnumerable<UserWithStatusDTO>> GetApplicantsAsync()
        {
            var result = await context.PerflowStudioApplicants
               .Where(a => a.Status == ApplicationStatus.Pending)
               .Include(a => a.User)
               .Include(a => a.Group)
               .AsNoTracking()
               .Select(a => new UserWithStatusDTO
               {
                   Id = a.UserId,
                   UserName = a.User.UserName,
                   IconURL = _imageService.GetImageUrl(a.User.IconURL),
                   Role = a.MemberType,
                   GroupId = a.GroupId,
                   Group = a.Group.Name
               })
               .ToListAsync();

            return result;
        }

        public async Task EditApplicantStatusAsync(EditApplicantStatusDTO status)
        {
            var application = await context.PerflowStudioApplicants
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.UserId == status.Id && a.Status == ApplicationStatus.Pending);

            if (application == null)
                throw new NotFoundExcepion("There is no such an application");

            application.Status = status.Status;

            if (application.Status != ApplicationStatus.Rejected)
            {
                application.User.Role = application.MemberType;
                application.User.Group = await context.Groups.FirstOrDefaultAsync(g => g.Id == application.GroupId);
            }

            context.Update(application);
            context.PerflowStudioApplicants.Remove(application);

            await context.SaveChangesAsync();

            var notification = new NotificationWriteDTO
            {
                Title = $"Application {status.Status.ToString().ToLower()}",
                Description = $"Your role: {application.User.Role}",
                Reference = 0,
                Type = NotificationType.ApplicantNotification
            };

            await Notify(notification, application.User.Id);
        }

        public async Task<IEnumerable<UserWithStatusDTO>> GetUsersByNameAsync(string term)
        {
            var artists = await context.Users
                .Where(user => user.UserName.Contains(term.Trim()))
                .Include(user => user.Group)
                .AsNoTracking()
                .Select(user => new UserWithStatusDTO
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    IconURL = _imageService.GetImageUrl(user.IconURL),
                    Role = user.Role,
                    GroupId = user.Group.Id,
                    Group = user.Group.Name
                })
                .ToListAsync();

            return artists;
        }
        
        public async Task EditUserRoleAsync(EditUserRoleDTO userRole)
        {
            var user = await context.Users
                .Include(u => u.Group)
                .FirstOrDefaultAsync(a => a.Id == userRole.Id);

            if (user == null)
                throw new NotFoundExcepion("There is no such a user");
            
            user.Role = userRole.Role;

            if (user.Role != UserRole.Artist)
                user.Group = null;

            context.Update(user);

            await context.SaveChangesAsync();

            var notification = new NotificationWriteDTO
            {
                Title = $"Role was changed",
                Description = $"Your role: {user.Role}",
                Reference = 0,
                Type = NotificationType.UserNotification
            };

            await Notify(notification, user.Id);
        }

        private async Task Notify(NotificationWriteDTO notification, int applicantId)
        {
            var message = await _notificationService.CreateApplicantNotificationAsync(notification, applicantId);
            await _notificationService.SendNotificationAsync(message);
        }

    }
}
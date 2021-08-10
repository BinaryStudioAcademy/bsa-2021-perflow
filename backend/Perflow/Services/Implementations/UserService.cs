using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Users;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using System;
using System.Threading.Tasks;
using Shared.ExceptionsHandler.Exceptions;
using Perflow.Common.Security;

namespace Perflow.Services.Implementations
{
    public class UserService : BaseService, IUserService
    {
        public UserService(PerflowContext context, IMapper mapper) : base(context, mapper) { }

        public async Task ChangePasswordAsync(UserChangePasswordDTO user)
        {
            var updatedUser = await context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);

            if (updatedUser == null)
            {
                throw new NotFoundExcepion($"{nameof(User)} not found");
            }

            if (!SecurityHelper.ValidatePassword(user.CurrentPassword, updatedUser.Password, updatedUser.Salt))
            {
                throw new ArgumentException("Incorrect current password");
            }

            var salt = SecurityHelper.GetRandomBytes();
            updatedUser.Password = SecurityHelper.HashPassword(user.NewPassword, salt);
            updatedUser.Salt = Convert.ToBase64String(salt);

            await context.SaveChangesAsync();
        }

        public async Task UpdateUserAsync(UserReadDTO user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user), "Argument cannot be null");
            }

            var updatedUser = mapper.Map<User>(user);

            context.Entry(updatedUser).State = EntityState.Modified;

            await context.SaveChangesAsync();
        }

        public async Task<ArtistDTO> GetArtistAsync(int id) 
        {
            var user = await context.Users.Include(u=>u.Albums)
                                          .AsNoTracking()
                                          .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                throw new ArgumentNullException(nameof(user), "Argument cannot be null");
            }

            return mapper.Map<ArtistDTO>(user);

        }
    }
}

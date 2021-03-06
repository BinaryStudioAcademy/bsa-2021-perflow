using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Constructor;
using Perflow.Common.DTO.Groups;
using Perflow.Common.DTO.Playlists;
using Perflow.Common.DTO.Users;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Domain.Enums;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class ConstructorService
    {
        private readonly PerflowContext _context;
        private readonly IMapper _mapper;
        private readonly IImageService _imageService;
        public ConstructorService(PerflowContext context, IMapper mapper, IImageService imageService)
        {

            _context = context;
            _mapper = mapper;
            _imageService = imageService;
        }
        public async Task<PageContainerDTO> GetPublishedContainer(int userId)
        {
            var result = await GetContainer(userId, findPublished: true);
            return result;
        }

        public async Task<PageContainerDTO> GetContainer(int userId, int containerId = 0, bool findPublished = false)
        {
            var result = await _context.PageContainers
                                                .Include(pc => pc.PageSections)
                                                .ThenInclude(ps => ps.PageSectionEntities)
                                                .Where(pc => (findPublished ? pc.IsPublished : pc.Id == containerId))
                                                .Select(pc => new PageContainerDTO
                                                {
                                                    Id = pc.Id,
                                                    Name = pc.Name,
                                                    IsPublished = pc.IsPublished,
                                                    ShowMix = pc.ShowMix,
                                                    ShowRecommendations = pc.ShowRecommendations,
                                                    ShowRecentlyPlayed = pc.ShowRecentlyPlayed,
                                                    PageSections = pc.PageSections.Select(ps => new PageSectionDTO
                                                    {
                                                        Id = ps.Id,
                                                        Name = ps.Name,
                                                        Position = ps.Position,
                                                        PageSectionEntities = ps.PageSectionEntities.Select(pse => new PageSectionEntityDTO
                                                        {
                                                            Id = pse.Id,
                                                            EntityType = pse.EntityType,
                                                            Position = pse.Position,
                                                            ReferenceId = pse.ReferenceId,
                                                            Entity = pse.EntityType == Domain.Enums.EntityType.Album ? _context.Albums
                                                                                                                            .Include(a => a.Author)
                                                                                                                            .Include(a => a.Group)
                                                                                                                                .ThenInclude(g => g.Artists)
                                                                                                                            .Include(a => a.Reactions)
                                                                                                                            .Select(a => new AlbumShortDTO
                                                                                                                            {
                                                                                                                                Id = a.Id,
                                                                                                                                Name = a.Name,
                                                                                                                                AuthorName = a.AuthorType == AuthorType.Artist ? a.Author.UserName : a.Group.Name,
                                                                                                                                ArtistIds = a.AuthorType == AuthorType.Artist ? new List<int>() { a.Author.Id } : a.Group.Artists.Select(a => a.Artist.Id).ToList(),
                                                                                                                                IconURL = _imageService.GetImageUrl(a.IconURL),
                                                                                                                                ReleaseYear = a.ReleaseYear,
                                                                                                                                IsSingle = a.IsSingle,
                                                                                                                                IsLiked = a.Reactions.Any(r => r.UserId == userId)
                                                                                                                            })
                                                                                                                            .FirstOrDefault(a => a.Id == pse.ReferenceId)
                                                                    : pse.EntityType == Domain.Enums.EntityType.Artist ? _context.Users
                                                                                                                            .Select(a => new ArtistReadDTO
                                                                                                                            {
                                                                                                                                Id = a.Id,
                                                                                                                                UserName = a.UserName,
                                                                                                                                IsArtist = a.Role == Shared.Auth.UserRole.Artist,
                                                                                                                                IconURL = _imageService.GetImageUrl(a.IconURL)
                                                                                                                            })
                                                                                                                            .FirstOrDefault(a => a.Id == pse.ReferenceId) 
                                                                    : pse.EntityType == Domain.Enums.EntityType.Playlist ? _context.Playlists
                                                                                                                            .Select(p => new PlaylistViewDTO
                                                                                                                            {
                                                                                                                                Id = p.Id,
                                                                                                                                Name = p.Name,
                                                                                                                                Description = p.Description,
                                                                                                                                AccessType = _mapper.Map<AccessTypeDTO>(p.AccessType),
                                                                                                                                IconURL = _imageService.GetImageUrl(p.IconURL)
                                                                                                                            })
                                                                                                                            .FirstOrDefault(a => a.Id == pse.ReferenceId)
                                                                    : pse.EntityType == Domain.Enums.EntityType.Group ? _context.Groups
                                                                                                                            .Select(g => new GroupShortDTO
                                                                                                                            {
                                                                                                                                Id = g.Id,
                                                                                                                                UserName = g.Name,
                                                                                                                                IsArtist = false,
                                                                                                                                IconURL = _imageService.GetImageUrl(g.IconURL)
                                                                                                                            })
                                                                                                                            .FirstOrDefault(a => a.Id == pse.ReferenceId)
                                                                    : null
                                                        })
                                                        .OrderBy(pse => pse.Position)
                                                        .ToList()
                                                    })
                                                    .OrderBy(ps => ps.Position)
                                                    .ToList()
                                                }).FirstOrDefaultAsync();
            return result;
        }
    }
}

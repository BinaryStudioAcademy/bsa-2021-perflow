using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Constructor;
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

        public async Task<PageContainer> CreatePageContainer(PageContainerDTO pageContainer)
        {
            var entity = _mapper.Map<PageContainer>(pageContainer);
            var result = await _context.PageContainers.AddAsync(entity);
            await _context.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<PageContainerDTO> UpdatePageContainer(PageContainerDTO containerDTO)
        {
            var container = await _context.PageContainers
                                            .Include(pc => pc.PageSections)
                                            .ThenInclude(ps => ps.PageSectionEntities)
                                            .FirstOrDefaultAsync(pc => pc.Id == containerDTO.Id);
            _context.PageSections.RemoveRange(_context.PageSections
                                                        .Include(ps => ps.PageSectionEntities)
                                                        .Where(ps => !container.PageSections.Contains(ps) && ps.PageContainerId == container.Id));
            var updatedContainer = _mapper.Map(containerDTO, container);
            _context.PageContainers.Update(updatedContainer);
            await _context.SaveChangesAsync();
            return _mapper.Map<PageContainerDTO>(updatedContainer);
        }

        public async Task<PageContainerViewDTO> PublishContainer(PageContainerViewDTO containerDTO)
        {
            var container = await _context.PageContainers.FirstOrDefaultAsync(pc => pc.Id == containerDTO.Id);
            var publishedContainer = await _context.PageContainers.FirstOrDefaultAsync(pc => pc.IsPublished);
            container.IsPublished = true;
            if (publishedContainer != null)
            {
                publishedContainer.IsPublished = false;
                _context.PageContainers.UpdateRange(publishedContainer, container);
            }
            else
            {
                _context.PageContainers.Update(container);
            }
            await _context.SaveChangesAsync();
            return _mapper.Map<PageContainerViewDTO>(container);
        }

        public async Task<ICollection<PageContainerViewDTO>> GetAllContainersViews()
        {
            var result = _mapper
                            .Map<ICollection<PageContainerViewDTO>>
                                (await _context.PageContainers.ToListAsync());
            return result;
        }

        public async Task<PageContainerDTO> GetPublishedContainer()
        {
            var result = await GetContainer(findPublished: true);
            return result;
        }

        public async Task<PageContainerDTO> GetContainer(int containerId = 0, bool findPublished = false)
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
                                                                                                                            .Select(a => new AlbumShortDTO
                                                                                                                            {
                                                                                                                                Id = a.Id,
                                                                                                                                Name = a.Name,
                                                                                                                                AuthorName = a.AuthorType == AuthorType.Artist ? a.Author.UserName : a.Group.Name,
                                                                                                                                IconURL = _imageService.GetImageUrl(a.IconURL),
                                                                                                                                ReleaseYear = a.ReleaseYear
                                                                                                                            })
                                                                                                                            .FirstOrDefault(a => a.Id == pse.ReferenceId)
                                                                    : pse.EntityType == Domain.Enums.EntityType.Artist ? _mapper.Map<ArtistReadDTO>(_context.Users.FirstOrDefault(a => a.Id == pse.ReferenceId)) 
                                                                    : pse.EntityType == Domain.Enums.EntityType.Playlist ? _mapper.Map<PlaylistViewDTO>(_context.Playlists.FirstOrDefault(p => p.Id == pse.ReferenceId)) : null
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

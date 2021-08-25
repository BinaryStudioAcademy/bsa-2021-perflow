using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Search;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class SearchHistoryService : BaseService
    {
        private readonly IImageService _imageService;

        public SearchHistoryService(PerflowContext context, IMapper mapper, IImageService imageService) 
            : base(context, mapper)
        {
            _imageService = imageService;
        }

        public async Task AddSearchHistory(SearchHistoryWriteDTO historyDTO)
        {
            if (historyDTO == null)
                throw new ArgumentNullException("Argument cannot be null");

            var history = mapper.Map<SearchHistory>(historyDTO);


            if (historyDTO.AlbumId != null)
            {
                history.Album = await context.Albums
                    .FirstOrDefaultAsync(a => a.Id == historyDTO.AlbumId);
            }
            else if (historyDTO.ArtistId != null)
            {
                history.Artist = await context.Users
                   .FirstOrDefaultAsync(u => u.Id == historyDTO.ArtistId);
            }
            else
            {
                history.Playlist = await context.Playlists
                    .FirstOrDefaultAsync(p => p.Id == historyDTO.PlaylistId);
            }

            await context.SearchHistory.AddAsync(history);

            await context.SaveChangesAsync();
        }
    }
}

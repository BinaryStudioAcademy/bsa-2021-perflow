using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.DataAccess.Context;
using Perflow.Common.DTO.Albums;
using Perflow.Common.DTO.Playlists;
using Perflow.Common.DTO.Users;
using Perflow.Services.Abstract;
using Shared.Auth;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class SearchService : BaseService
    {
        public SearchService(PerflowContext context, IMapper mapper) : base(context, mapper)
        { }

        public async Task<ICollection<ArtistReadDTO>> FindArtistsByNameAsync(string searchTerm, int amount)
        {
            var artists = await context.Users
                .Where(user => user.Role == UserRole.Artist && user.UserName.Contains(searchTerm.Trim()))
                .Take(amount)
                .AsNoTracking()
                .ToListAsync();

            return mapper.Map<ICollection<ArtistReadDTO>>(artists);
        }

        public async Task<ICollection<AlbumForListDTO>> FindAlbumsByNameAsync(string searchTerm, int amount)
        {
            var albums = await context.Albums
                .Include(album => album.Author)
                .Where(album => album.Name.Contains(searchTerm.Trim()))
                .Take(amount)
                .AsNoTracking()
                .Select(album => new AlbumForListDTO
                {
                    Id = album.Id,
                    Name = album.Name,
                    ReleaseYear = album.ReleaseYear,
                    IconURL = album.IconURL,
                    Author = new AlbumViewAuthorsDTO (
                        album.Author.Id,
                        album.Author.UserName,
                        album.Author.Role == UserRole.Artist)
                })
                .ToListAsync();

            return mapper.Map<ICollection<AlbumForListDTO>>(albums);
        }

        public async Task<ICollection<PlaylistViewDTO>> FindPlaylistsByNameAsync(string searchTerm, int amount)
        {
            var playlists = await context.Playlists
                .Where(playlist => playlist.Name.Contains(searchTerm.Trim()))
                .Take(amount)
                .AsNoTracking()
                .ToListAsync();

            return mapper.Map<ICollection<PlaylistViewDTO>>(playlists);
        }
    }
}

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
using Perflow.Common.DTO.Songs;
using Perflow.Common.DTO.Groups;

namespace Perflow.Services.Implementations
{
    public class SearchService : BaseService
    {
        public SearchService(PerflowContext context, IMapper mapper) : base(context, mapper)
        { }

        public async Task<ICollection<SongForPlaylistSongSearchDTO>> FindSongsByNameAsync(string searchTerm, int amount, int userId)
        {
            var songs = await context.Songs
                .Where(song => song.Name.Contains(searchTerm.Trim()))
                .Include(song => song.Artist)
                .Include(song => song.Group)
                .Include(song => song.Album)
                .Include(song => song.Reactions)
                .Take(amount)
                .AsNoTracking()
                .Select(song => new SongForPlaylistSongSearchDTO
                {
                    Id = song.Id,
                    Album = mapper.Map<AlbumForPlaylistSongSearchDTO>(song.Album),
                    Artist = mapper.Map<UserForPlaylistDTO>(song.Artist),
                    Group = mapper.Map<GroupForPlaylistDTO>(song.Group),
                    Duration = song.Duration,
                    HasCensorship = song.HasCensorship,
                    Name = song.Name,
                    IsLiked = song.Reactions.Any(r => r.UserId == userId)
                })
                .ToListAsync();

            return songs;
        }

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

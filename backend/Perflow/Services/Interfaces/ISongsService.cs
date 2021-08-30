﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Perflow.Common.DTO.Songs;
using Perflow.Domain.Enums;

namespace Perflow.Services.Interfaces
{
    public interface ISongsService
    {
        public Task<IEnumerable<SongLikedDTO>> GetLikedSongsAsync(int userId);
        public Task<IEnumerable<SongReadDTO>> GetLikedFullSongsAsync(int userId);
        public Task<int> GetLikedSongsCountAsync(int userId);
        public Task<SongReadDTO> FindSongsByIdAsync(int id);
        public Task<SongReadDTO> AddSongInfoAsync(SongWriteDTO songInfo, int artistId);
        public Task RemoveSongAsync(int id);
        public Task<IEnumerable<SongReadDTO>> GetTopSongsByLikes(int amount);
        public Task<IEnumerable<SongForAlbumDTO>> GetTopSongsByAuthorIdAsync(int id, int count, AuthorType type, int userId);
        public Task<IEnumerable<SongForAlbumDTO>> GetSongsByAlbumIdAsync(int id, int userId);
        public Task<bool> CheckIsLiked(int songId, int userId);
        public Task Update(SongWriteDTO song);
        public Task UpdateOrders(SongOrderDTO[] songOrders);
    }
}

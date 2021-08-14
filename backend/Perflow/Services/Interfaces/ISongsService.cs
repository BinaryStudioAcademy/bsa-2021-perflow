﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Perflow.Common.DTO.Songs;

namespace Perflow.Services.Interfaces
{
    public interface ISongsService
    {
        public Task<IEnumerable<SongReadDTO>> GetLikedSongsAsync(int userId);
        public Task<IEnumerable<SongReadDTO>> FindSongsByNameAsync(string searchTerm);
        public Task<SongReadDTO> FindSongsByIdAsync(int id);
        public Task<FileContentResult> GetSongFileAsync(string blobId);
        public Task<SongWriteDTO> AddSongInfoAsync(SongWriteDTO songInfo);
        public Task<string> UploadSongAsync(IFormFile song);
        public Task RemoveSongAsync(int id);
        public Task<IEnumerable<SongReadDTO>> GetTopSongsByAuthorIdAsync(int id, int count);
        public Task<IEnumerable<SongReadDTO>> GetTopSongsByLikes(int amount);
    }
}

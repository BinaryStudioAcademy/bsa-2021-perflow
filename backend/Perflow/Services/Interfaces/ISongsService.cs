using System.Collections.Generic;
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
        public Task<FileContentResult> GetSongFileAsync(int id);
        public Task<SongWriteDTO> AddSongInfoAsync(SongWriteDTO songInfo);
        public Task UploadSongAsync(IFormFile song, int id);
        public Task RemoveSongInfoAsync(int id);
    }
}

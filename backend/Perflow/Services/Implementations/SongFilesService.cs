using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Perflow.Common.Helpers;
using Perflow.DataAccess.Context;
using Perflow.Domain.Enums;
using Perflow.Services.Interfaces;
using Shared.AzureBlobStorage.Interfaces;
using Shared.AzureBlobStorage.Models;

namespace Perflow.Services.Implementations
{
    public class SongFilesService : ISongFilesService
    {
        private const string SongsContainerName = "songs";

        private readonly PerflowContext _context;
        private readonly IBlobService _blobService;

        public SongFilesService(IBlobService blobService, PerflowContext context)
        {
            _blobService = blobService;
            _context = context;
        }

        public async Task<BlobDto> GetSongFileAsync(int songId, AudioQuality quality)
        {
            var song = await _context.Songs.FindAsync(songId);

            if (song == null)
            {
                return null;
            }

            var blobId = song.GetBlobId(quality);

            if (!await _blobService.FileExistsAsync(SongsContainerName, blobId))
            {
                blobId = song.SourceBlobId;
            }

            var blob = await _blobService.DownloadFileBlobAsync(SongsContainerName, blobId);

            return blob;
        }
    }
}

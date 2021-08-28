using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Perflow.Common.Helpers;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Domain.Enums;
using Perflow.Services.Interfaces;
using Shared.AzureBlobStorage.Extensions;
using Shared.AzureBlobStorage.Interfaces;
using Shared.AzureBlobStorage.Models;
using Shared.ExceptionsHandler.Exceptions;
using Shared.Processor.Models;

namespace Perflow.Services.Implementations
{
    public class SongFilesService : ISongFilesService
    {
        private const string SongsContainerName = "songs";

        private readonly PerflowContext _context;
        private readonly ISongsUploadService _songsUploadService;
        private readonly IBlobService _blobService;

        private static readonly HashSet<string> SupportedMediaTypes = new()
        {
            "audio/mpeg",
            "audio/mp3",
            "audio/ogg",
            "audio/wav",
            "audio/vnd.wav"
        };

        public SongFilesService(ISongsUploadService songsUploadService, IBlobService blobService, PerflowContext context)
        {
            _songsUploadService = songsUploadService;
            _blobService = blobService;
            _context = context;
        }

        public async Task<BlobDto> GetSongFileAsync(int songId, SongQualityLevel quality)
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

        public async Task UploadSongFile(int songId, IFormFile songFile)
        {
            if (songFile == null)
            {
                throw new ArgumentNullException(nameof(songFile), "Argument cannot be null");
            }

            if (!SupportedMediaTypes.Contains(songFile.ContentType))
            {
                throw new BadRequestException($"Content type: {songFile.ContentType} is unsupported");
            }

            var song = await _context.Songs.FindAsync(songId);

            if (song == null)
            {
                throw new NotFoundExcepion();
            }

            var songSourceBlobId = Guid.NewGuid().ToString();

            var songQualityLevels = new SongsQualityLevels
            {
                VeryHigh = new QualityLevel(Guid.NewGuid().ToString(), 256 * 1000),
                High = new QualityLevel(Guid.NewGuid().ToString(), 160 * 1000),
                Medium = new QualityLevel(Guid.NewGuid().ToString(), 96 * 1000),
                Low = new QualityLevel(Guid.NewGuid().ToString(), 48 * 1000),
            };

            song.SourceBlobId = songSourceBlobId;
            song.VeryHighBlobId = songQualityLevels.VeryHigh.id;
            song.HighBlobId = songQualityLevels.High.id;
            song.MediumBlobId = songQualityLevels.Medium.id;
            song.LowBlobId = songQualityLevels.Low.id;

            await _context.SaveChangesAsync();

            var options = new SongProcessingOptions
            {
                SourceBlobId = songSourceBlobId,
                SourceContentType = songFile.ContentType,
                QualityLevels = songQualityLevels,
                SongData = songFile.GetBinaryData()
            };

            _songsUploadService.UploadSong(options);
        }

        public Task DeleteSongFilesAsync(Song song)
        {
            if (song == null)
            {
                return Task.CompletedTask;
            }

            return Task.WhenAll(
                _blobService.DeleteFileBlobAsync("songs", song.VeryHighBlobId),
                _blobService.DeleteFileBlobAsync("songs", song.VeryHighBlobId),
                _blobService.DeleteFileBlobAsync("songs", song.VeryHighBlobId),
                _blobService.DeleteFileBlobAsync("songs", song.VeryHighBlobId)
            );
        }
    }
}

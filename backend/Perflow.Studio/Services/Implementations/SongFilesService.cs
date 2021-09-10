using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Http;
using OneOf;
using OneOf.Types;
using Perflow.Studio.Business.Songs.Models;
using Perflow.Studio.Services.Interfaces;
using Shared.AzureBlobStorage.Extensions;
using Shared.AzureBlobStorage.Interfaces;
using Shared.Processor.Models;

namespace Perflow.Studio.Services.Implementations
{
    public class SongFilesService : ISongFilesService
    {
        private const string SongsContainerName = "songs";

        private readonly IDbConnection _connection;
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

        public SongFilesService(ISongsUploadService songsUploadService, IBlobService blobService, IDbConnection connection)
        {
            _songsUploadService = songsUploadService;
            _blobService = blobService;
            _connection = connection;
        }

        public async Task<OneOf<Success, Error<string>>> UploadSongFileAsync(int songId, IFormFile songFile)
        {
            var fileValidationError = ValidateFile(songFile);
            if (fileValidationError != null)
            {
                return new Error<string>(fileValidationError);
            }

            var blobIds = await GetSongBlobIds(songId);

            if (blobIds == null)
            {
                return new Error<string>("Song not found");
            }

            _ = DeleteSongFilesAsync(blobIds);

            blobIds = new SongBlobIds
            {
                Id = songId,
                SourceBlobId = Guid.NewGuid().ToString(),
                VeryHighBlobId = Guid.NewGuid().ToString(),
                HighBlobId = Guid.NewGuid().ToString(),
                MediumBlobId = Guid.NewGuid().ToString(),
                LowBlobId = Guid.NewGuid().ToString()
            };

            var songQualityLevels = new SongsQualityLevels
            {
                VeryHigh = new QualityLevel(blobIds.VeryHighBlobId, 256 * 1000),
                High = new QualityLevel(blobIds.HighBlobId, 160 * 1000),
                Medium = new QualityLevel(blobIds.MediumBlobId, 96 * 1000),
                Low = new QualityLevel(blobIds.LowBlobId, 48 * 1000),
            };

            await SetSongBlobIds(blobIds);

            var options = new SongProcessingOptions
            {
                Id = songId,
                SourceBlobId = blobIds.SourceBlobId,
                SourceContentType = songFile.ContentType,
                QualityLevels = songQualityLevels,
                SongData = songFile.GetBinaryData()
            };

            _songsUploadService.UploadSong(options);

            return new Success();
        }

        public async Task<OneOf<Success, NotFound>> DeleteSongFilesAsync(int songId)
        {
            var blobIds = await GetSongBlobIds(songId);

            if (blobIds == null)
            {
                return new NotFound();
            }

            await DeleteSongFilesAsync(blobIds);

            return new Success();
        }

        public Task DeleteSongFilesAsync(SongBlobIds songBlobIds)
        {
            var tasks = songBlobIds
                .Where(blobId => !string.IsNullOrWhiteSpace(blobId))
                .Select(blobId => _blobService.DeleteFileBlobAsync(SongsContainerName, blobId));
            return Task.WhenAll(tasks);
        }

        private static string? ValidateFile(IFormFile songFile)
        {
            if (!SupportedMediaTypes.Contains(songFile.ContentType))
            {
                return $"Content type: {songFile.ContentType} is unsupported";
            }

            return null;
        }

        private Task<SongBlobIds?> GetSongBlobIds(int songId)
        {
            const string sql =
                @"SELECT
                    Id,
                    SourceBlobId,
                    VeryHighBlobId,
                    HighBlobId,
                    MediumBlobId,
                    LowBlobId
                FROM Songs
                WHERE Id = @Id";

            return _connection.QueryFirstOrDefaultAsync<SongBlobIds?>(sql, new { Id = songId });
        }

        private Task SetSongBlobIds(SongBlobIds blobIds)
        {
            const string sql =
                @"UPDATE Songs SET
                    SourceBlobId = @Source,
                    VeryHighBlobId = @VeryHigh,
                    HighBlobId = @High,
                    MediumBlobId = @Medium,
                    LowBlobId = @Low
                WHERE Id = @Id";

            var data = new
            {
                Source = blobIds.SourceBlobId,
                VeryHigh = blobIds.VeryHighBlobId,
                High = blobIds.HighBlobId,
                Medium = blobIds.MediumBlobId,
                Low = blobIds.LowBlobId,
                Id = blobIds.Id
            };

            return _connection.ExecuteAsync(sql, data);
        }
    }
}

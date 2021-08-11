using System;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using Perflow.Domain.Enums;

namespace Perflow.Common.DTO.Songs
{
    public class SongWriteDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public AuthorType AuthorType { get; set; }
        public int ArtistId { get; set; }
        public int? GroupId { get; set; }
        public int AlbumId { get; set; }
        public string IconURL { get; set; }
        public int Duration { get; set; }
        public bool HasCensorship { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
    }
}

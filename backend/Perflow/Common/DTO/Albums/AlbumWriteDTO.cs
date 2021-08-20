using Microsoft.AspNetCore.Http;
using Perflow.Domain.Enums;

namespace Perflow.Common.DTO.Albums
{
    public class AlbumWriteDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ReleaseYear { get; set; }
        public IFormFile Icon { get; set; }
        public string Description { get; set; }
        public AlbumRegion Region { get; set; }
        public bool IsPublished { get; set; }
        public AuthorType AuthorType { get; set; }
        public int? AuthorId { get; set; }
        public int? GroupId { get; set; }
        public bool IsSingle { get; set; }
    }
}

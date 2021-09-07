using Perflow.Common.DTO.Tags;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Perflow.Services.Interfaces
{
    public interface ITagService
    {
        Task<TagReadDTO> CreateTagAsync(TagWriteDTO tag);

        Task<IEnumerable<TagReadDTO>> GetAllAsync();

        Task AddTagsAsync(SongTagsDTO tags);

        Task<IEnumerable<TagReadDTO>> CreateTagsAsync(TagsCreateDTO tagsDto);
    }
}

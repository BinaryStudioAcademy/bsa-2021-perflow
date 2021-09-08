using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.Tags;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class TagService : BaseService, ITagService
    {
        public TagService(PerflowContext context, IMapper mapper) : base(context, mapper)
        {
        }

        public async Task<TagReadDTO> CreateTagAsync(TagWriteDTO tagDto)
        {
            var isTagExist = context.Tags.Any(t => t.Name == tagDto.Name);

            if (isTagExist)
            {
                throw new ArgumentException("Tag already exists");
            }

            var tag = mapper.Map<Tag>(tagDto);

            var tagEntity = await context.Tags.AddAsync(tag);

            await context.SaveChangesAsync();

            return mapper.Map<TagReadDTO>(tagEntity.Entity);
        }

        public async Task<IEnumerable<TagReadDTO>> CreateTagsAsync(TagsCreateDTO tagsDto)
        {
            var tags = context.Tags.Select(t => t.Name);

            var newTags = tagsDto.Tags.Where(t => !tags.Contains(t));

            var createdTags = new List<Tag>();

            foreach (var tag in newTags)
            {
                var createdTag = context.Tags.Add(new Tag { Name = tag });
                createdTags.Add(createdTag.Entity);
            }

            await context.SaveChangesAsync();

            return mapper.Map<IEnumerable<TagReadDTO>>(createdTags);
        }

        public async Task<IEnumerable<TagReadDTO>> GetAllAsync()
        {
            var tags = await context.Tags
                .AsNoTracking()
                .ToListAsync();

            return mapper.Map<IEnumerable<TagReadDTO>>(tags);
        }

        public async Task AddTagsAsync(SongTagsDTO tagsDto)
        {
            var tags = await context.SongTags
                .Where(st => st.SongId == tagsDto.SongId)
                .ToListAsync();

            if (tags.Count > 0)
            {
                context.SongTags.RemoveRange(tags);
            }

            var songTags = tagsDto.Tags.Select(st => new SongTag
            {
                SongId = tagsDto.SongId,
                TagId = st.Id
            });

            context.SongTags.AddRange(songTags);

            await context.SaveChangesAsync();
        }
    }
}

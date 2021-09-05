using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.ContentSynchronization;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class ContentSynchronizationService : BaseService
    {
        public ContentSynchronizationService(
            PerflowContext context,
            IMapper mapper
        ) : base(context, mapper) { }

        public async Task AddContentSyncAsync(ContentSyncWriteDTO contentDTO, int userId)
        {
            bool isNewUser = false;

            var content = await context.ContentSynchronization
                .Include(cs => cs.Song)
                .Include(cs => cs.User)
                .FirstOrDefaultAsync(cs => cs.UserId == userId);

            if (content == null)
            {
                isNewUser = true;
                content = mapper.Map<ContentSynchronization>(contentDTO);
                content.Id = 0;
                content.User = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);
                content.Song = await context.Songs.FirstOrDefaultAsync(s => s.Id == contentDTO.SongId);
            }

            if (content.SongId != contentDTO.SongId)
            {
                content.Song = await context.Songs.FirstOrDefaultAsync(s => s.Id == contentDTO.SongId);
            }

            content.Time = contentDTO.Time;

            if (isNewUser)
            {
                await context.ContentSynchronization.AddAsync(content);
            }
            else
            {
                context.ContentSynchronization.Update(content);
            }

            await context.SaveChangesAsync();
        }

        public async Task<ContentSyncReadDTO> GetContentSyncAsync(int userId)
        {
            var content = await context.ContentSynchronization
                .AsNoTracking()
                .FirstOrDefaultAsync(cs => cs.UserId == userId);

            return mapper.Map<ContentSyncReadDTO>(content);
        }
    }
}

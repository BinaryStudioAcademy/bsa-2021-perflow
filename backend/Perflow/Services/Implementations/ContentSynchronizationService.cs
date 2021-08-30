using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Perflow.Common.DTO.ContentSynchronization;
using Perflow.DataAccess.Context;
using Perflow.Domain;
using Perflow.Services.Abstract;
using Perflow.Services.Interfaces;
using Shared.ExceptionsHandler.Exceptions;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.Services.Implementations
{
    public class ContentSynchronizationService : BaseService
    {
        private readonly IImageService _imageService;
        public ContentSynchronizationService(PerflowContext context, IMapper mapper, IImageService imageService)
            : base(context, mapper)
        {
            _imageService = imageService;
        }

        public async Task AddContentSyncAsync(ContentSyncWriteDTO contentDTO)
        {
            bool isNewUser = false;

            var content = await context.ContentSynchronization
                .Include(cs => cs.Song)
                .Include(cs => cs.User)
                .FirstOrDefaultAsync(cs => cs.UserId == contentDTO.UserId);

            if (content == null)
            {
                isNewUser = true;
                content = mapper.Map<ContentSynchronization>(contentDTO);
                content.Id = 0;
                content.User = await context.Users.FirstOrDefaultAsync(u => u.Id == contentDTO.UserId);
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
                .Where(cs => cs.UserId == userId)
                .Include(cs => cs.Song)
                    .ThenInclude(s => s.Album)
                        .ThenInclude(a => a.Group)
                    .Include(s => s.Song)
                        .ThenInclude(a => a.Artist)
                .Include(cs => cs.User)
                .AsNoTracking()
                .Select(cs => new ContentSyncReadDTO
                {
                    SongId = cs.SongId,
                    Name = cs.Song.Name,
                    ArtistName = cs.Song.Album.Group != null ? cs.Song.Album.Group.Name : cs.Song.Album.Author.UserName,
                    ImageURL = cs.Song.Album.IconURL,
                    SongURL = cs.Song.SourceBlobId
                })
                .FirstOrDefaultAsync();

            if (content == null)
            {
                throw new NotFoundExcepion($"There is no history for such a user");
            }

            return content;
        }
    }
}

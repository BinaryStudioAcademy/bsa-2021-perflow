using Microsoft.Extensions.DependencyInjection;
using Perflow.Services.Interfaces;
using Perflow.Common.MappingProfiles;
using System.Reflection;
using Perflow.Common.DTO;

namespace Perflow.Services.Extensions
{
    public static class ServiceExtensions
    {
        public static void RegisterAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<AlbumProfile>();
                cfg.AddProfile<AlbumReactionProfile>();
                cfg.AddProfile<ArtistReactionProfile>();
                cfg.AddProfile<GroupProfile>();
                cfg.AddProfile<PlaylistProfile>();
                cfg.AddProfile<PlaylistReactionProfile>();
                cfg.AddProfile<RoleProfile>();
                cfg.AddProfile<SongProfile>();
                cfg.AddProfile<SongReactionProfile>();
                cfg.AddProfile<UserProfile>();
                cfg.AddProfile<UserSettingsProfile>();
            },
            Assembly.GetExecutingAssembly());
        }

        public static void RegisterCustomServices(this IServiceCollection services)
        {
            services.AddScoped<IService<PlaylistDTO>, PlaylistService>();
        }
    }
}

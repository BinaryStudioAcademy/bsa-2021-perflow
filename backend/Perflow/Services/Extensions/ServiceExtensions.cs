using Microsoft.Extensions.DependencyInjection;
using Perflow.Services.Interfaces;
using Perflow.Common.MappingProfiles;
using System.Reflection;
using Perflow.Services.Implementations;

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
                cfg.AddProfile<ArtistProfile>();
            },
            Assembly.GetExecutingAssembly());
        }

        public static void RegisterCustomServices(this IServiceCollection services)
        {
            services.AddSingleton<IFirebaseService, FirebaseService>();

            services.AddScoped<IAuthService, AuthService>();

            services.AddScoped<IUsersService, UsersService>();

            services.AddScoped<PlaylistService>();
            services.AddScoped<GroupService>();
            services.AddScoped<SongReactionService>();
            services.AddScoped<ArtistReactionService>();
            services.AddScoped<AlbumReactionService>();
            services.AddScoped<PlaylistReactionService>();

            services.AddScoped<ISongsService, SongsService>();

            services.AddScoped<AlbumsService>();
            
            services.AddScoped<IArtistService, ArtistService>();

            services.AddScoped<IImageService, ImageService>();
        }
    }
}

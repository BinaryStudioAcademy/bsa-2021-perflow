using Microsoft.Extensions.DependencyInjection;
using Perflow.Services.Interfaces;
using Perflow.Common.MappingProfiles;
using System.Reflection;
using Perflow.Services.Implementations;
using Shared.Processor.Models;

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
                cfg.AddProfile<RecentlyPlayedProfile>();
                cfg.AddProfile<SearchHistoryProfile>();
                cfg.AddProfile<ConstructorProfile>();
                cfg.AddProfile<PlaylistEditorProfile>();
                cfg.AddProfile<ContentSynchronizationProfile>();
            },
            Assembly.GetExecutingAssembly());
        }

        public static void RegisterCustomServices(this IServiceCollection services)
        {
            services.AddSingleton<IFirebaseService, FirebaseService>();

            services.AddScoped<IAuthService, AuthService>();

            services.AddScoped<IUsersService, UsersService>();

            services.AddSingleton<IImageUploadService, ImageUploadService>();
            services.AddSingleton<ISongsUploadService, SongsUploadService>();
            services.AddSingleton<ISongRecognitionService, SongRecognitionService>();

            services.AddScoped<PlaylistService>();
            services.AddScoped<GroupService>();
            services.AddScoped<SongReactionService>();
            services.AddScoped<ArtistReactionService>();
            services.AddScoped<AlbumReactionService>();
            services.AddScoped<PlaylistReactionService>();
            services.AddScoped<RecentlyPlayedService>();
            services.AddScoped<SearchService>();
            services.AddScoped<GroupReactionService>();
            services.AddScoped<SearchHistoryService>();
            services.AddScoped<ContentSynchronizationService>();
            services.AddScoped<ApplicantsService>();

            services.AddScoped<ISongFilesService, SongFilesService>();
            services.AddScoped<ISongsService, SongsService>();

            services.AddScoped<AlbumsService>();

            services.AddScoped<IArtistService, ArtistService>();

            services.AddScoped<IImageService, ImageService>();

            services.AddScoped<ConstructorService>();

            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<PlaylistEditorsService>();
            services.AddScoped<SharePlayService>();

            services.AddScoped<ITagService, TagService>();

            services.AddOptions<SongRecognitionRabbitMQOptions>().BindConfiguration(SongRecognitionRabbitMQOptions.Key);
        }
    }
}

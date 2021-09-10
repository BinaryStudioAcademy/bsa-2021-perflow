using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Shared.SongRecognition.Options;
using Shared.SongRecognition.Services;
using SoundFingerprinting.Audio;

namespace Shared.SongRecognition.Extensions
{
    public static class AddSongRecognitionExtension
    {
        public static IServiceCollection AddSongRecognition(this IServiceCollection services, EmyOptions emyOptions)
        {
            services.AddSingleton<IAudioService, SoundFingerprintingAudioService>();

            services.AddSingleton<IModelServiceFactory>(provider => new ModelServiceFactory(emyOptions));

            return services;
        }

        public static IServiceCollection AddSongRecognition(this IServiceCollection services, IConfiguration configuration)
        {
            EmyOptions emyOptions = new();
            configuration.Bind("EmyConnection", emyOptions);
            services.AddSongRecognition(emyOptions);

            return services;
        }
    }
}

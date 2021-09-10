using Shared.SongRecognition.Options;
using SoundFingerprinting.Emy;

namespace Shared.SongRecognition.Services
{
    public class ModelServiceFactory : IModelServiceFactory
    {
        private readonly EmyOptions _emyOptions;

        public ModelServiceFactory(EmyOptions emyOptions)
        {
            _emyOptions = emyOptions;
        }

        public EmyModelService CreateModelService()
        {
            return EmyModelService.NewInstance(_emyOptions.HostName, _emyOptions.Port);
        }
    }
}

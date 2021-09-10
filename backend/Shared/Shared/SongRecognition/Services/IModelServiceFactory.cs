using SoundFingerprinting.Emy;

namespace Shared.SongRecognition.Services
{
    public interface IModelServiceFactory
    {
        public EmyModelService CreateModelService();
    }
}

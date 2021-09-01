using Perflow.Domain;
using Perflow.Domain.Enums;

namespace Perflow.Common.Helpers
{
    public static class SongHelper
    {
        public static string GetBlobId(this Song song, AudioQuality quality)
        {
            return quality switch
            {
                AudioQuality.VeryHigh => song.VeryHighBlobId,
                AudioQuality.High => song.HighBlobId,
                AudioQuality.Medium => song.MediumBlobId,
                AudioQuality.Low => song.LowBlobId,
                _ => song.MediumBlobId
            };
        }
    }
}

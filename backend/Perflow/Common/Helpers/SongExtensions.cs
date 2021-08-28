using Perflow.Domain;
using Perflow.Domain.Enums;

namespace Perflow.Common.Helpers
{
    public static class SongHelper
    {
        public static string GetBlobId(this Song song, SongQualityLevel quality)
        {
            return quality switch
            {
                SongQualityLevel.VeryHigh => song.VeryHighBlobId,
                SongQualityLevel.High => song.HighBlobId,
                SongQualityLevel.Medium => song.MediumBlobId,
                SongQualityLevel.Low => song.LowBlobId,
                _ => song.MediumBlobId
            };
        }
    }
}

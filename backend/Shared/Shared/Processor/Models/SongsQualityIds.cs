using System.Collections;
using System.Collections.Generic;

namespace Shared.Processor.Models
{
    public class SongsQualityLevels : IEnumerable<QualityLevel>
    {
        public QualityLevel VeryHigh { get; init; } = default;

        public QualityLevel High { get; init; } = default;

        public QualityLevel Medium { get; init; } = default;

        public QualityLevel Low { get; init; } = default;

        public IEnumerator<QualityLevel> GetEnumerator()
        {
            yield return Low;
            yield return Medium;
            yield return High;
            yield return VeryHigh;
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }

    public readonly struct QualityLevel
    {
        public readonly string id;
        public readonly long bitrate;

        public QualityLevel(string id, long bitrate)
        {
            this.id = id;
            this.bitrate = bitrate;
        }
    }
}

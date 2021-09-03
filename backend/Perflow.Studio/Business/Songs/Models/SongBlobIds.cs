using System.Collections;
using System.Collections.Generic;

namespace Perflow.Studio.Business.Songs.Models
{
    public class SongBlobIds : IEnumerable<string>
    {
        public int Id { get; set; }

        public string SourceBlobId { get; set; } = string.Empty;

        public string VeryHighBlobId { get; set; } = string.Empty;

        public string HighBlobId { get; set; } = string.Empty;

        public string MediumBlobId { get; set; } = string.Empty;

        public string LowBlobId { get; set; } = string.Empty;

        public IEnumerator<string> GetEnumerator()
        {
            yield return VeryHighBlobId;
            yield return HighBlobId;
            yield return MediumBlobId;
            yield return LowBlobId;
            yield return SourceBlobId;
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}

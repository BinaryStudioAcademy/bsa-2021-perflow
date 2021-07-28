using System;

namespace Perflow.Common.DTO
{
    public sealed class SongReactionDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public UserDTO User { get; set; }
        public int SongId { get; set; }
        public SongDTO Song { get; set; }
    }
}

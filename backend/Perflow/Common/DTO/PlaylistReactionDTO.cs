﻿namespace Perflow.Common.DTO
{
    public sealed class PlaylistReactionDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public UserDTO User { get; set; }
        public int PlaylistId { get; set; }
        public PlaylistDTO Playlist { get; set; }
    }
}

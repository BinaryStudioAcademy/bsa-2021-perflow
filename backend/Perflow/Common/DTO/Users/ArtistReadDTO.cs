namespace Perflow.Common.DTO.Users
{
    public class ArtistReadDTO
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string IconURL { get; set; }
        public bool IsArtist { get; set; } = true;
    }
}

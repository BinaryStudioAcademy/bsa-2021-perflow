using Microsoft.EntityFrameworkCore;
using Perflow.Domain;

namespace Perflow.DataAccess.Context
{
    public class PerflowContext : DbContext
    {
        public DbSet<Album> Albums { get; set; }
        public DbSet<AlbumReaction> AlbumReactions { get; set; }
        public DbSet<ArtistReaction> ArtistReactions { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<PlaylistReaction> PlaylistReactions { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<SongReaction> SongReactions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserSettings> UserSettings { get; set; }

        public PerflowContext(DbContextOptions<PerflowContext> options): base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Configure(); 
        }

    }
}

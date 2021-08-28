using Microsoft.EntityFrameworkCore;
using Perflow.Domain;
using Perflow.Domain.Abstract;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Perflow.DataAccess.Context
{
    public class PerflowContext : DbContext
    {
        public DbSet<Album> Albums { get; set; }
        public DbSet<AlbumReaction> AlbumReactions { get; set; }
        public DbSet<ArtistReaction> ArtistReactions { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupReaction> GroupReactions { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Playlist> Playlists { get; set; }
        public DbSet<PlaylistSong> PlaylistSong { get; set; }
        public DbSet<PlaylistReaction> PlaylistReactions { get; set; }
        public DbSet<Song> Songs { get; set; }
        public DbSet<SongReaction> SongReactions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserSettings> UserSettings { get; set; }
        public DbSet<RecentlyPlayed> RecentlyPlayed { get; set; }
        public DbSet<ArtistApplicant> ArtistApplicants { get; set; }
        public DbSet<SearchHistory> SearchHistory { get; set; }
        public DbSet<PageContainer> PageContainers { get; set; }
        public DbSet<PageSection> PageSections { get; set; }
        public DbSet<PageSectionEntity> PageSectionEntities { get; set; }

        public PerflowContext(DbContextOptions<PerflowContext> options): base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Configure();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            SetAuditValues();
            return await base.SaveChangesAsync(cancellationToken);
        }

        public override int SaveChanges()
        {
            SetAuditValues();
            return base.SaveChanges();
        }

        private void SetAuditValues()
        {
            var entries = ChangeTracker.Entries<AuditEntity>().ToList();

            if (!entries.Any(x => x.State == EntityState.Added))
                return;

            foreach (var entry in entries)
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedAt = DateTimeOffset.Now;
                        break;
                }
            }
        }
    }
}

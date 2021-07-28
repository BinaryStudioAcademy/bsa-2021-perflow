using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class SongConfiguration : IEntityTypeConfiguration<Song>
    {
        public void Configure(EntityTypeBuilder<Song> builder)
        {
            builder
                .HasOne(s => s.Artist)
                .WithMany();

            builder
                .HasOne(s => s.Group)
                .WithMany();

            builder
                .HasMany(s => s.Reactions)
                .WithOne(sr => sr.Song);

            builder
                .HasMany(s => s.Playlists)
                .WithOne(ps => ps.Song);

            builder
                .HasMany(s => s.Albums)
                .WithMany(a => a.Songs);
        }
    }
}

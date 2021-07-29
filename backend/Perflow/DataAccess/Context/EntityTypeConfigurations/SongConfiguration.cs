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

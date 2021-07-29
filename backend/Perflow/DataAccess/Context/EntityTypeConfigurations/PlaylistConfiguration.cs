using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class PlaylistConfiguration : IEntityTypeConfiguration<Playlist>
    {
        public void Configure(EntityTypeBuilder<Playlist> builder)
        {
            //builder
            //    .HasOne(pl => pl.Author)
            //    .WithMany();

            builder
                .HasMany(pl => pl.Reactions)
                .WithOne(pr => pr.Playlist);

            builder
                .HasMany(pr => pr.Songs)
                .WithOne(ps => ps.Playlist);
        }
    }
}

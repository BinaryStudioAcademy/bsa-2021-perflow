using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class AlbumConfiguration : IEntityTypeConfiguration<Album>
    {
        public void Configure(EntityTypeBuilder<Album> builder)
        {
            //builder
            //    .HasOne(al => al.Author)
            //    .WithMany();

            //builder
            //    .HasOne(al => al.Group)
            //    .WithMany();

            builder
                .HasMany(al => al.Reactions)
                .WithOne(r => r.Album);

            builder
                .HasMany(al => al.Songs)
                .WithMany(s => s.Albums);
        }
    }
}

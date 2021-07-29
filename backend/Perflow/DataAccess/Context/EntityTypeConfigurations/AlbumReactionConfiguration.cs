using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class AlbumReactionConfiguration : IEntityTypeConfiguration<AlbumReaction>
    {
        public void Configure(EntityTypeBuilder<AlbumReaction> builder)
        {
            builder
                .HasOne(ar => ar.Album)
                .WithMany(al => al.Reactions);

            //builder
            //    .HasOne(ar => ar.User)
            //    .WithMany();
        }
    }
}

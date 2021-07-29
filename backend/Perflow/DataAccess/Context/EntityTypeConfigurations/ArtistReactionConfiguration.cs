using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class ArtistReactionConfiguration : IEntityTypeConfiguration<ArtistReaction>
    {
        public void Configure(EntityTypeBuilder<ArtistReaction> builder)
        {
            builder
                .HasOne(ar => ar.Artist)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(ar => ar.User)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class ArtistReactionConfiguration : IEntityTypeConfiguration<ArtistReaction>
    {
        public void Configure(EntityTypeBuilder<ArtistReaction> builder)
        {
            // TODO
        }
    }
}

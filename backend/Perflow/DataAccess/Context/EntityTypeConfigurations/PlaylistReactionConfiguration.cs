using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class PlaylistReactionConfiguration : IEntityTypeConfiguration<PlaylistReaction>
    {
        public void Configure(EntityTypeBuilder<PlaylistReaction> builder)
        {
            // TODO
        }
    }
}

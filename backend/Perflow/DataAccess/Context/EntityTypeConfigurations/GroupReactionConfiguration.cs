using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class GroupReactionConfiguration : IEntityTypeConfiguration<GroupReaction>
    {
        public void Configure(EntityTypeBuilder<GroupReaction> builder)
        {
            builder
                .HasOne(gr => gr.Group)
                .WithMany(g => g.Reactions);

            builder
                .HasOne(gr => gr.User)
                .WithMany(u => u.GroupReactions);
        }
    }
}

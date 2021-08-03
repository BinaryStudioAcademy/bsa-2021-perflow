using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class SongReactionConfiguration : IEntityTypeConfiguration<SongReaction>
    {
        public void Configure(EntityTypeBuilder<SongReaction> builder)
        {
            builder
                .HasOne(sr => sr.Song)
                .WithMany(s => s.Reactions)
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(sr => sr.User)
                .WithMany(u => u.Reactions)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}

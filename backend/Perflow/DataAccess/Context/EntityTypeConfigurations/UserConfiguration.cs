using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder
                .HasOne(u => u.Group)
                .WithMany(gr => gr.Users);

            builder
                .HasMany(u => u.ArtistReactions)
                .WithOne(u => u.Artist);

            builder
                .HasMany(u => u.Albums)
                .WithOne(a => a.Author);
        }
    }
}

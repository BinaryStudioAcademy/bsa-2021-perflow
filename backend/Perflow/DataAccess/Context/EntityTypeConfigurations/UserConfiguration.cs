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
                .HasMany(u => u.Roles)
                .WithMany(r => r.Users);

            builder
                .HasMany(u => u.Followers)
                .WithOne(af => af.Artist);

            builder
                .HasMany(u => u.Subscriptions)
                .WithOne(u => u.Follower);

            builder
                .HasMany(u => u.Albums)
                .WithOne(a => a.Author);
        }
    }
}

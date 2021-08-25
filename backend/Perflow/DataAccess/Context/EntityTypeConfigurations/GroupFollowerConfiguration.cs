using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class GroupFollowerConfiguration : IEntityTypeConfiguration<GroupFollower>
    {
        public void Configure(EntityTypeBuilder<GroupFollower> builder)
        {
            builder
                .HasOne(gf => gf.Follower)
                .WithMany(u => u.GroupSubscriptions);

            builder
                .HasOne(gf => gf.Group)
                .WithMany(g => g.Followers);
        }
    }
}

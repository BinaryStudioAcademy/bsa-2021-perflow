using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class ArtistFollowerConfiguration : IEntityTypeConfiguration<ArtistFollower>
    {
        public void Configure(EntityTypeBuilder<ArtistFollower> builder)
        {
            builder
                .HasOne(af => af.Follower)
                .WithMany(u => u.Subscriptions)
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasOne(af => af.Artist)
                .WithMany(u => u.Followers)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

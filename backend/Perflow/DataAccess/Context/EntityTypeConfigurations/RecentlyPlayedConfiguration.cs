using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class RecentlyPlayedConfiguration : IEntityTypeConfiguration<RecentlyPlayed>
    {
        public void Configure(EntityTypeBuilder<RecentlyPlayed> builder)
        {
            builder
                .HasOne(rp => rp.User)
                .WithMany()
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(rp => rp.Album)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(rp => rp.Playlist)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(rp => rp.Artist)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(rp => rp.Song)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .Property(rp => rp.Frequency)
                .HasDefaultValue(1);

            builder
                .Property(rp => rp.LastTimeListened)
                .HasDefaultValueSql("getdate()");
        }
    }
}

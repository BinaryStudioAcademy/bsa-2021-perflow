using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class PlaylistEditorConfiguration : IEntityTypeConfiguration<PlaylistEditor>
    {
        public void Configure(EntityTypeBuilder<PlaylistEditor> builder)
        {
            builder
              .HasOne(re => re.User)
              .WithMany()
              .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasOne(re => re.Playlist)
                .WithMany()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

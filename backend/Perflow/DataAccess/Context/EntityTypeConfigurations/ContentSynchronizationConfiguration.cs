using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class ContentSynchronizationConfiguration : IEntityTypeConfiguration<ContentSynchronization>
    {
        public void Configure(EntityTypeBuilder<ContentSynchronization> builder)
        {
            builder
                .HasOne(cs => cs.User)
                .WithMany()
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(cs => cs.Song)
                .WithMany()
                .OnDelete(DeleteBehavior.Cascade);

            builder
                .Property(cs => cs.Time)
                .HasDefaultValue(0);
        }
    }
}

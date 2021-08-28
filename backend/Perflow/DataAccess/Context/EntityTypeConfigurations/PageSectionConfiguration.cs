using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class PageSectionConfiguration : IEntityTypeConfiguration<PageSection>
    {
        public void Configure(EntityTypeBuilder<PageSection> builder)
        {
            builder
                .HasMany(ps => ps.PageSectionEntities)
                .WithOne(pse => pse.PageSection);

            builder
                .HasOne(ps => ps.PageContainer)
                .WithMany(pc => pc.PageSections);
        }
    }
}

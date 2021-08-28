using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class PageSectionEntityConfiguration : IEntityTypeConfiguration<PageSectionEntity>
    {
        public void Configure(EntityTypeBuilder<PageSectionEntity> builder)
        {
            builder
                .HasOne(pse => pse.PageSection)
                .WithMany(ps => ps.PageSectionEntities);
        }
    }
}

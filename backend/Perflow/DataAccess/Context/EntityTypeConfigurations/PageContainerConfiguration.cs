using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class PageContainerConfiguration : IEntityTypeConfiguration<PageContainer>
    {
        public void Configure(EntityTypeBuilder<PageContainer> builder)
        {
            builder
                .HasMany(pc => pc.PageSections)
                .WithOne(ps => ps.PageContainer);
        }
    }
}

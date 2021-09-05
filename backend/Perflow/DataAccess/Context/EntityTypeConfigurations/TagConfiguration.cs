using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class TagConfiguration : IEntityTypeConfiguration<Tag>
    {
        public void Configure(EntityTypeBuilder<Tag> builder)
        {

            builder.Property(t => t.Name).HasMaxLength(100);

            builder.Property(t => t.Color).HasMaxLength(10);
        }
    }
}

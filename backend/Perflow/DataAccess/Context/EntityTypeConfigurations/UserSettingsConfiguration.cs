using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;
using Perflow.Domain.Enums;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class UserSettingsConfiguration : IEntityTypeConfiguration<UserSettings>
    {
        public void Configure(EntityTypeBuilder<UserSettings> builder)
        {
            builder
                .HasOne(us => us.User)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

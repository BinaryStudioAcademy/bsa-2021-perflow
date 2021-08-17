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

            builder
                .Property(us => us.Autoplay)
                .HasDefaultValue(true);

            builder
                .Property(us => us.Language)
                .HasDefaultValue("English");

            builder
                .Property(us => us.Quality)
                .HasDefaultValue(AudioQuality.High);

            builder
                .Property(us => us.ShowExplicitContent)
                .HasDefaultValue(true);

            builder
                .Property(us => us.ShowFriendsPlaying)
                .HasDefaultValue(true);

            builder
                .Property(us => us.ShowNewReleases)
                .HasDefaultValue(true);
        }
    }
}

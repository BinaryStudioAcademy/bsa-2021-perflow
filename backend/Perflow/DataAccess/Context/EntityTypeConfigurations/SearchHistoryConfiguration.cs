using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class SearchHistoryConfiguration : IEntityTypeConfiguration<SearchHistory>
    {
        public void Configure(EntityTypeBuilder<SearchHistory> builder)
        {
            builder
              .HasOne(rp => rp.User)
              .WithMany()
              .OnDelete(DeleteBehavior.Cascade);

            builder
                .HasOne(rp => rp.Album)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasOne(rp => rp.Playlist)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            builder
                .HasOne(rp => rp.Artist)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}

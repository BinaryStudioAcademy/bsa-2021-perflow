﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Perflow.Domain;

namespace Perflow.DataAccess.Context.EntityTypeConfigurations
{
    public class SongReactionConfiguration : IEntityTypeConfiguration<SongReaction>
    {
        public void Configure(EntityTypeBuilder<SongReaction> builder)
        {
            // TODO
        }
    }
}

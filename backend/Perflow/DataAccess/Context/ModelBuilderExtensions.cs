using Microsoft.EntityFrameworkCore;
using Perflow.Common.Security;
using Perflow.DataAccess.Context.EntityTypeConfigurations;
using Perflow.Domain;
using Perflow.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Perflow.DataAccess.Context
{
    public static class ModelBuilderExtensions
    {
        public static void Configure(this ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new AlbumConfiguration());
            modelBuilder.ApplyConfiguration(new AlbumReactionConfiguration());
            modelBuilder.ApplyConfiguration(new ArtistReactionConfiguration());
            modelBuilder.ApplyConfiguration(new GroupConfiguration());
            modelBuilder.ApplyConfiguration(new PlaylistConfiguration());
            modelBuilder.ApplyConfiguration(new PlaylistReactionConfiguration());
            modelBuilder.ApplyConfiguration(new RoleConfiguration());
            modelBuilder.ApplyConfiguration(new SongConfiguration());
            modelBuilder.ApplyConfiguration(new SongReactionConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new UserSettingsConfiguration());
            modelBuilder.ApplyConfiguration(new NotificationConfiguration());
            modelBuilder.ApplyConfiguration(new ArtistFollowerConfiguration());
            Seed(modelBuilder);
        }

        public static void Seed(this ModelBuilder modelBuilder)
        {
            var roles = GenerateRoles();
            var users = GenerateUsers();
            var albums = GenerateAlbums(users);
            var songs = GenerateSongs(albums);
            var playlists = GeneratePlaylists(users);
            var playlistSongs = GeneratePlaylistSongs(playlists, songs);
            var songReactions = GenerateSongReactions(users, songs);
            var artistReactions = GenerateArtistReactions(users);

            modelBuilder.Entity<Role>().HasData(roles);
            modelBuilder.Entity<User>().HasData(users);
            modelBuilder.Entity<Album>().HasData(albums);
            modelBuilder.Entity<Song>().HasData(songs);
            modelBuilder.Entity<Playlist>().HasData(playlists);
            modelBuilder.Entity<PlaylistSong>().HasData(playlistSongs);
            modelBuilder.Entity<SongReaction>().HasData(songReactions);
            modelBuilder.Entity<ArtistReaction>().HasData(artistReactions);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Roles)
                .WithMany(r => r.Users)
                .UsingEntity(ur => ur.HasData(
                    new { UsersId = users[0].Id, RolesId = roles[2].Id },
                    new { UsersId = users[1].Id, RolesId = roles[1].Id },
                    new { UsersId = users[2].Id, RolesId = roles[1].Id },
                    new { UsersId = users[3].Id, RolesId = roles[0].Id }
                    )
                );

        }

        public static IList<Role> GenerateRoles() =>
            new List<Role>
            {
                new Role
                {
                    Id = 1,
                    Name = "Moderator"
                },
                new Role
                {
                    Id = 2,
                    Name = "Artist"
                },
                new Role
                {
                    Id = 3,
                    Name = "User"
                }
            };

        public static IList<User> GenerateUsers()
        {
            var avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWMxxTKJB-4WptJQP94DgYzLQJMZ4U69ASOnDvNMmvEZJwwvHx7LVXg7iwQvpK6eAeHQ&usqp=CAU";
            var password = "Qwerty1234";

            return new List<User>
            {
                new User
                {
                    Id = 1,
                    Birthday = new DateTimeOffset(new DateTime(1999, 3, 2)),
                    Country = "Ukraine",
                    CreatedAt = new DateTimeOffset(new DateTime(2021, 7, 29)),
                    Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                    Email = "user@gmail.com",
                    Gender = true,
                    GroupId = null,
                    IconURL = avatar,
                    Salt = "2W+y0GwQIbcSl5vUC6DAyo6I+opkO3E9NlSa+hU7huA=",
                    Password = SecurityHelper.HashPassword(password, Convert.FromBase64String("2W+y0GwQIbcSl5vUC6DAyo6I+opkO3E9NlSa+hU7huA=")),
                    UserName = "user"
                },
                new User
                {
                    Id = 2,
                    Birthday = new DateTimeOffset(new DateTime(1940, 10, 9)),
                    Country = "Great Britain",
                    CreatedAt = new DateTimeOffset(new DateTime(2021, 7, 28)),
                    Description = " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    Email = "artist@gmail.com",
                    Gender = true,
                    GroupId = null,
                    IconURL = "https://cdn.ananasposter.ru/image/cache/catalog/poster/music/85/8817-1000x830.jpg",
                    Salt = "K2M0pMRA8JCJmVqY69nhwbEW7cXnFvqhj3K8A9WqpCo=",
                    Password = SecurityHelper.HashPassword(password, Convert.FromBase64String("K2M0pMRA8JCJmVqY69nhwbEW7cXnFvqhj3K8A9WqpCo=")),
                    UserName = "JohnLennon"
                },
                new User
                {
                    Id = 3,
                    Birthday = new DateTimeOffset(new DateTime(1942, 6, 18)),
                    Country = "Great Britain",
                    CreatedAt = new DateTimeOffset(new DateTime(2021, 7, 27)),
                    Description = "It was popularised in the 1960s.",
                    Email = "artist2@gmail.com",
                    Gender = true,
                    GroupId = null,
                    IconURL = "https://sites.google.com/site/korolevstvoanglia/_/rsrc/1468862873851/anglijskie-znamenitosti/the-beatles/pol-makkartni/ihJe5HHUxrE.jpg",
                    Salt = "n7EefMTF/qz4DSlCLhz6SvvfaNZ5J9drrVtoYBUD15I=",
                    Password = SecurityHelper.HashPassword(password, Convert.FromBase64String("n7EefMTF/qz4DSlCLhz6SvvfaNZ5J9drrVtoYBUD15I=")),
                    UserName = "PaulMcCartney"
                },
                new User
                {
                    Id = 4,
                    Birthday = new DateTimeOffset(new DateTime(1996, 2, 2)),
                    Country = "Poland",
                    CreatedAt = new DateTimeOffset(new DateTime(2021, 7, 26)),
                    Description = "It has survived not only five centuries, but also the leap into electronic, remaining essentially unchanged.",
                    Email = "moderator@gmail.com",
                    Gender = false,
                    GroupId = null,
                    IconURL = avatar,
                    Salt = "jdEeMqVH6VdFQjdzLTWNT4+vHS2B3MWNQQTUYm9o984=",
                    Password = SecurityHelper.HashPassword(password, Convert.FromBase64String("jdEeMqVH6VdFQjdzLTWNT4+vHS2B3MWNQQTUYm9o984=")),
                    UserName = "moderator"
                }
            };
        }

        public static IList<Album> GenerateAlbums(IList<User> users) =>
            new List<Album>
            {
                new Album
                {
                    Id = 1,
                    AuthorId = users[1].Id,
                    AuthorType = AuthorType.Artist,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 9, 9)),
                    Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                    GroupId = null,
                    IconURL = "https://upload.wikimedia.org/wikipedia/ru/6/69/ImagineCover.jpg",
                    isPublished = true,
                    isSingle = true,
                    Name = "Imagine",
                    Region = AlbumRegion.UK,
                    ReleaseYear = 1971
                },
                new Album
                {
                    Id = 2,
                    AuthorId = users[1].Id,
                    AuthorType = AuthorType.Artist,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 9, 9)),
                    Description = "Lorem printing and typesetting industry.",
                    GroupId = null,
                    IconURL = "https://upload.wikimedia.org/wikipedia/ru/2/2a/MindGames.jpg",
                    isPublished = true,
                    isSingle = false,
                    Name = "Mind Games",
                    Region = AlbumRegion.UK,
                    ReleaseYear = 1973
                },
                new Album
                {
                    Id = 3,
                    AuthorId = users[2].Id,
                    AuthorType = AuthorType.Artist,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 9, 9)),
                    Description = "Lorem text of the printing and typesetting industry.",
                    GroupId = null,
                    IconURL = "https://upload.wikimedia.org/wikipedia/ru/thumb/e/eb/Mccartney_album.jpg/274px-Mccartney_album.jpg",
                    isPublished = true,
                    isSingle = true,
                    Name = "McCartney",
                    Region = AlbumRegion.UK,
                    ReleaseYear = 1970
                },
            };

        public static IList<Song> GenerateSongs(IList<Album> albums)
        {
            var icon = "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg";

            return new List<Song>
            {
                new Song
                {
                    Id = 1,
                    Name = "That Would Be Something",
                    AuthorType = AuthorType.Artist,
                    ArtistId = albums[2].AuthorId,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 9, 9)),
                    Duration = 2,
                    GroupId = null,
                    HasCensorship = false,
                    IconURL = icon,
                    AlbumId = 1,
                },
                new Song
                {
                    Id = 2,
                    Name = "Mind Games",
                    AuthorType = AuthorType.Artist,
                    ArtistId = albums[1].AuthorId,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 9, 9)),
                    Duration = 4,
                    GroupId = null,
                    HasCensorship = false,
                    IconURL = icon,
                    AlbumId = 2
                },
                new Song
                {
                    Id = 3,
                    Name = "Imagine",
                    AuthorType = AuthorType.Artist,
                    ArtistId = albums[0].AuthorId,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 9, 9)),
                    Duration = 2,
                    GroupId = null,
                    HasCensorship = false,
                    IconURL = icon,
                    AlbumId = 2
                },
                new Song
                {
                    Id = 4,
                    Name = "Only People",
                    AuthorType = AuthorType.Artist,
                    ArtistId = albums[1].AuthorId,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 9, 9)),
                    Duration = 3,
                    GroupId = null,
                    HasCensorship = false,
                    IconURL = icon,
                    AlbumId = 3
                },
            };
        }

        public static IList<Playlist> GeneratePlaylists(IList<User> users)
        {
            var icon = "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg";

            return new List<Playlist>
            {
                new Playlist
                {
                    Id = 1,
                    AccessType = AccessType.Default,
                    AuthorId = users[3].Id,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 10, 19)),
                    Description = "It is a long established fact readable content of a page when looking at its layout.",
                    IconURL = icon,
                    Name = "Rock"
                },
                new Playlist
                {
                    Id = 2,
                    AccessType = AccessType.Default,
                    AuthorId = users[0].Id,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 2, 1)),
                    Description = "It is a page when looking at its layout.",
                    IconURL = icon,
                    Name = "Almost the Beatles"
                },
                new Playlist
                {
                    Id = 3,
                    AccessType = AccessType.Secret,
                    AuthorId = users[0].Id,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 12, 1)),
                    Description = "It is a some page when looking at its layout.",
                    IconURL = icon,
                    Name = "JohnLennon"
                }
            };
        }

        public static IList<PlaylistSong> GeneratePlaylistSongs(IList<Playlist> playlists, IList<Song> songs) =>
            new List<PlaylistSong>
            {
                new PlaylistSong
                {
                    Id = 1,
                    PlaylistId = playlists[0].Id,
                    SongId = songs[0].Id,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 10, 19))
                },
                new PlaylistSong
                {
                    Id = 2,
                    PlaylistId = playlists[0].Id,
                    SongId = songs[1].Id,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 10, 19))
                },
                new PlaylistSong
                {
                    Id = 3,
                    PlaylistId = playlists[0].Id,
                    SongId = songs[2].Id,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 10, 19))
                },
                new PlaylistSong
                {
                    Id = 4,
                    PlaylistId = playlists[1].Id,
                    SongId = songs[0].Id,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 2, 1))
                },
                new PlaylistSong
                {
                    Id = 5,
                    PlaylistId = playlists[1].Id,
                    SongId = songs[1].Id,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 2, 1))
                },
                new PlaylistSong
                {
                    Id = 6,
                    PlaylistId = playlists[1].Id,
                    SongId = songs[2].Id,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 2, 1))
                },
                new PlaylistSong
                {
                    Id = 7,
                    PlaylistId = playlists[2].Id,
                    SongId = songs[1].Id,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 12, 1))
                },
                new PlaylistSong
                {
                    Id = 8,
                    PlaylistId = playlists[2].Id,
                    SongId = songs[2].Id,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 12, 1))
                }
                ,
                new PlaylistSong
                {
                    Id = 9,
                    PlaylistId = playlists[2].Id,
                    SongId = songs[3].Id,
                    CreatedAt = new DateTimeOffset(new DateTime(2020, 12, 1))
                }
            };

        private static IList<SongReaction> GenerateSongReactions(IList<User> users, IList<Song> songs)
        {
            return new List<SongReaction>
            {
                new SongReaction
                {
                    Id = 1,
                    SongId = songs[0].Id,
                    UserId = users[0].Id,
                },
                new SongReaction
                {
                    Id = 2,
                    SongId = songs[2].Id,
                    UserId = users[0].Id,
                },
                new SongReaction
                {
                    Id = 3,
                    SongId = songs[3].Id,
                    UserId = users[0].Id,
                }
            };
        }

        private static IList<ArtistReaction> GenerateArtistReactions(IList<User> users)
        {
            return new List<ArtistReaction>
            {
                new ArtistReaction
                {
                    Id = 1,
                    UserId = 1,
                    ArtistId = 2
                },
                new ArtistReaction
                {
                    Id = 2,
                    UserId = 1,
                    ArtistId = 3
                }
            };
        }
    }
}

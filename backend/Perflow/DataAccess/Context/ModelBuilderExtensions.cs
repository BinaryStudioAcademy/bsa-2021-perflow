using Microsoft.EntityFrameworkCore;
using Perflow.DataAccess.Context.EntityTypeConfigurations;
using Perflow.Domain;
using Perflow.Domain.Enums;
using System;
using System.Collections.Generic;
using Shared.Auth;
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
            modelBuilder.ApplyConfiguration(new SongConfiguration());
            modelBuilder.ApplyConfiguration(new SongReactionConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new UserSettingsConfiguration());
            modelBuilder.ApplyConfiguration(new NotificationConfiguration());
            modelBuilder.ApplyConfiguration(new RecentlyPlayedConfiguration());
            modelBuilder.ApplyConfiguration(new GroupReactionConfiguration());
            modelBuilder.ApplyConfiguration(new SearchHistoryConfiguration());
            modelBuilder.ApplyConfiguration(new ContentSynchronizationConfiguration());
        }

        public static void Seed(this ModelBuilder modelBuilder)
        {
            var users = GenerateUsers();
            var groups = GenerateGroups();
            var albums = GenerateAlbums(users);
            var songs = GenerateSongs(albums);
            var playlists = GeneratePlaylists(users);
            var playlistSongs = GeneratePlaylistSongs(playlists, songs);
            var songReactions = GenerateSongReactions(users, songs);
            var artistReactions = GenerateArtistReactions();
            var albumReactions = GenerateAlbumReactions();

            modelBuilder.Entity<User>().HasData(users);
            modelBuilder.Entity<Album>().HasData(albums);
            modelBuilder.Entity<Song>().HasData(songs);
            modelBuilder.Entity<Playlist>().HasData(playlists);
            modelBuilder.Entity<PlaylistSong>().HasData(playlistSongs);
            modelBuilder.Entity<Group>().HasData(groups);
            modelBuilder.Entity<SongReaction>().HasData(songReactions);
            modelBuilder.Entity<ArtistReaction>().HasData(artistReactions);
            modelBuilder.Entity<AlbumReaction>().HasData(albumReactions);

            modelBuilder.Entity<Song>()
                .HasOne(s => s.Album)
                .WithMany(a => a.Songs);
        }

        public static IList<Group> GenerateGroups() =>
            new List<Group>
            {
                 new Group
                 {
                    Id = 1,
                    Name = "Maroon 5"
                 },
                 new Group
                 {
                    Id = 2,
                    Name = "Imagine Dragons"
                 },
            };

        public static IList<User> GenerateUsers()
        {
            var avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWMxxTKJB-4WptJQP94DgYzLQJMZ4U69ASOnDvNMmvEZJwwvHx7LVXg7iwQvpK6eAeHQ&usqp=CAU";

            return new List<User>
            {
                new User
                {
                    Id = 1,
                    FirebaseId = "Y6sm8RLdUQQZG0FPfUYQz5OoxG53",
                    UserName = "user",
                    Email = "user@mail.com",
                    Role = UserRole.User,
                    Birthday = new DateTimeOffset(new DateTime(1999, 3, 2)),
                    Country = "Ukraine",
                    CreatedAt = new DateTimeOffset(new DateTime(2021, 7, 29)),
                    Description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                    Gender = true,
                    GroupId = null,
                    IconURL = avatar
                },
                new User
                {
                    Id = 2,
                    FirebaseId = "cPknpzguENTOBGdc7LMO5t84ABj2",
                    UserName = "artist",
                    Email = "artist@mail.com",
                    Role = UserRole.Artist,
                    Birthday = new DateTimeOffset(new DateTime(1940, 10, 9)),
                    Country = "Great Britain",
                    CreatedAt = new DateTimeOffset(new DateTime(2021, 7, 28)),
                    Description = " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
                    Gender = true,
                    GroupId = null,
                    IconURL = "https://cdn.ananasposter.ru/image/cache/catalog/poster/music/85/8817-1000x830.jpg",
                },
                new User
                {
                    Id = 3,
                    FirebaseId = "w7Ww4Ep1sxRKpu73CuiMZDM3bjr2",
                    UserName = "moderator",
                    Email = "moderator@mail.com",
                    Role = UserRole.Moderator,
                    Birthday = new DateTimeOffset(new DateTime(1942, 6, 18)),
                    Country = "Great Britain",
                    CreatedAt = new DateTimeOffset(new DateTime(2021, 7, 27)),
                    Description = "It was popularised in the 1960s.",
                    Gender = true,
                    GroupId = null,
                    IconURL = "https://sites.google.com/site/korolevstvoanglia/_/rsrc/1468862873851/anglijskie-znamenitosti/the-beatles/pol-makkartni/ihJe5HHUxrE.jpg"
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
                    IsPublished = true,
                    IsSingle = true,
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
                    IsPublished = true,
                    IsSingle = false,
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
                    IsPublished = true,
                    IsSingle = true,
                    Name = "McCartney",
                    Region = AlbumRegion.UK,
                    ReleaseYear = 1970
                },
                new Album
                {
                    Id = 4,
                    AuthorId = users[2].Id,
                    AuthorType = AuthorType.Artist,
                    CreatedAt = new DateTimeOffset(new DateTime(2021, 7, 29)),
                    Description = "Lorem text of the printing and typesetting industry.",
                    GroupId = null,
                    IconURL = "https://s3-alpha-sig.figma.com/img/1fb9/07df/8cb83fc1826b60e1ac4136f907838260?Expires=1628467200&Signature=AYz434YZD2rEyIIGCCPLssB3aItrqVCktB59iue5-RQ68UQyUM~Vc5ek7Lc-yoItOaPgcw7r1J6eLz82wSA5zqTI9Hh7Bp7LzgD5uIM5P90QWdpYmgeCxW5u66n~~VxMy51WfAcGL8VQ2C1PTT9OpChOhrT4r9jpzFwfmJCShPZbqdRQslmU3b8oyInIdnR~XFUdf2Demw5X0NbSF4esMgkkWvT5gDdR19Q5RNyDcdG8nh5rQY~LSXRBVFmEcd5aDr8-bRMjdr36BJ0ntsF2CeUaJ1y3tJB64rgZrCZO11deVRMl6XGAlwT3I~BF~wo4vM~-qyGn4HghkFFHh~sxxw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
                    IsPublished = true,
                    IsSingle = true,
                    Name = "Fresh & Chill",
                    Region = AlbumRegion.UK,
                    ReleaseYear = 2015
                },
                new Album
                {
                    Id = 5,
                    AuthorId = users[2].Id,
                    AuthorType = AuthorType.Artist,
                    CreatedAt = new DateTimeOffset(new DateTime(2021, 7, 27)),
                    Description = "Lorem text of the printing and typesetting industry.",
                    GroupId = null,
                    IconURL = "https://i.ibb.co/4SHq8NX/Ellipse-42-3.png",
                    IsPublished = true,
                    IsSingle = true,
                    Name = "Relax Work",
                    Region = AlbumRegion.UK,
                    ReleaseYear = 2015
                },
                new Album
                {
                    Id = 6,
                    AuthorId = users[2].Id,
                    AuthorType = AuthorType.Artist,
                    CreatedAt = new DateTimeOffset(new DateTime(2021, 7, 28)),
                    Description = "Lorem text of the printing and typesetting industry.",
                    GroupId = null,
                    IconURL = "https://i.ibb.co/7r5Ft4n/Ellipse-42.png",
                    IsPublished = true,
                    IsSingle = true,
                    Name = "Tropical chaos",
                    Region = AlbumRegion.UK,
                    ReleaseYear = 2015
                },
                new Album
                {
                    Id = 7,
                    AuthorId = users[2].Id,
                    AuthorType = AuthorType.Artist,
                    CreatedAt = new DateTimeOffset(new DateTime(2021, 7, 26)),
                    Description = "Lorem text of the printing and typesetting industry.",
                    GroupId = null,
                    IconURL = "https://i.ibb.co/sK5hcbn/Ellipse-42-4.png",
                    IsPublished = true,
                    IsSingle = true,
                    Name = "Beautiful People",
                    Region = AlbumRegion.UK,
                    ReleaseYear = 2015
                },
                new Album
                {
                    Id = 8,
                    AuthorId = users[2].Id,
                    AuthorType = AuthorType.Artist,
                    CreatedAt = new DateTimeOffset(new DateTime(2021, 7, 25)),
                    Description = "Lorem text of the printing and typesetting industry.",
                    GroupId = null,
                    IconURL = "https://i.ibb.co/4SHq8NX/Ellipse-42-3.png",
                    IsPublished = true,
                    IsSingle = true,
                    Name = "Relax Work",
                    Region = AlbumRegion.UK,
                    ReleaseYear = 2015
                },
                new Album
                {
                    Id = 9,
                    AuthorId = users[2].Id,
                    AuthorType = AuthorType.Artist,
                    CreatedAt = new DateTimeOffset(new DateTime(2021, 7, 23)),
                    Description = "Lorem text of the printing and typesetting industry.",
                    GroupId = null,
                    IconURL = "https://i.ibb.co/7r5Ft4n/Ellipse-42.png",
                    IsPublished = true,
                    IsSingle = true,
                    Name = "Tropical chaos",
                    Region = AlbumRegion.UK,
                    ReleaseYear = 2015
                },
                new Album
                {
                    Id = 10,
                    AuthorId = users[2].Id,
                    AuthorType = AuthorType.Artist,
                    CreatedAt = new DateTimeOffset(new DateTime(2021, 7, 24)),
                    Description = "Lorem text of the printing and typesetting industry.",
                    GroupId = null,
                    IconURL = "https://i.ibb.co/sK5hcbn/Ellipse-42-4.png",
                    IsPublished = true,
                    IsSingle = true,
                    Name = "Beautiful People",
                    Region = AlbumRegion.UK,
                    ReleaseYear = 2015
                },
            };

        public static IList<Song> GenerateSongs(IList<Album> albums)
        { 

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
                    AlbumId = 3
                }
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
                    AuthorId = users[1].Id,
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

        private static IList<ArtistReaction> GenerateArtistReactions()
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

        private static IList<AlbumReaction> GenerateAlbumReactions()
        {
            return new List<AlbumReaction>
            {
                new AlbumReaction
                {
                    Id = 1,
                    UserId = 1,
                    AlbumId = 1
                },
                new AlbumReaction
                {
                    Id = 2,
                    UserId = 1,
                    AlbumId = 2
                },
                new AlbumReaction
                {
                    Id = 3,
                    UserId = 1,
                    AlbumId = 3
                }
            };
        }
    }
}

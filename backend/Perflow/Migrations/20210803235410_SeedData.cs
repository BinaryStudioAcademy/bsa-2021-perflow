using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Perflow.Migrations
{
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Groups",
                columns: new[] { "Id", "CreatedAt", "Name" },
                values: new object[,]
                {
                    { 1, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Maroon 5" },
                    { 2, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "Imagine Dragons" }
                });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Moderator" },
                    { 2, "Artist" },
                    { 3, "User" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Birthday", "Country", "CreatedAt", "Description", "Email", "Gender", "GroupId", "IconURL", "Password", "Salt", "UserName" },
                values: new object[,]
                {
                    { 1, new DateTimeOffset(new DateTime(1999, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), "Ukraine", new DateTimeOffset(new DateTime(2021, 7, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "user@gmail.com", true, null, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWMxxTKJB-4WptJQP94DgYzLQJMZ4U69ASOnDvNMmvEZJwwvHx7LVXg7iwQvpK6eAeHQ&usqp=CAU", "2w4tdavyRWnzPwjhzJJseAcm3kkrRQaTvuzAXBloRZs=", "2W+y0GwQIbcSl5vUC6DAyo6I+opkO3E9NlSa+hU7huA=", "user" },
                    { 2, new DateTimeOffset(new DateTime(1940, 10, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Great Britain", new DateTimeOffset(new DateTime(2021, 7, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "artist@gmail.com", true, null, "https://cdn.ananasposter.ru/image/cache/catalog/poster/music/85/8817-1000x830.jpg", "xNzTPir2trd17vYgGnQyv6xs6tKVoFbloHMN9wXSi2E=", "K2M0pMRA8JCJmVqY69nhwbEW7cXnFvqhj3K8A9WqpCo=", "JohnLennon" },
                    { 3, new DateTimeOffset(new DateTime(1942, 6, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Great Britain", new DateTimeOffset(new DateTime(2021, 7, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "It was popularised in the 1960s.", "artist2@gmail.com", true, null, "https://sites.google.com/site/korolevstvoanglia/_/rsrc/1468862873851/anglijskie-znamenitosti/the-beatles/pol-makkartni/ihJe5HHUxrE.jpg", "xldj0m3IAZ/yYdH+eaWN5FmdSCqMNxPEk4CxgbrxbXk=", "n7EefMTF/qz4DSlCLhz6SvvfaNZ5J9drrVtoYBUD15I=", "PaulMcCartney" },
                    { 4, new DateTimeOffset(new DateTime(1996, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), "Poland", new DateTimeOffset(new DateTime(2021, 7, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "It has survived not only five centuries, but also the leap into electronic, remaining essentially unchanged.", "moderator@gmail.com", false, null, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWMxxTKJB-4WptJQP94DgYzLQJMZ4U69ASOnDvNMmvEZJwwvHx7LVXg7iwQvpK6eAeHQ&usqp=CAU", "NVB3ZZEK+rqseACtraFR+RHK4sdReGavKt5IE7mw7gQ=", "jdEeMqVH6VdFQjdzLTWNT4+vHS2B3MWNQQTUYm9o984=", "moderator" },
                    { 5, new DateTimeOffset(new DateTime(1999, 3, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), "Ukraine", new DateTimeOffset(new DateTime(2021, 7, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", "artist3@gmail.com", true, null, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWMxxTKJB-4WptJQP94DgYzLQJMZ4U69ASOnDvNMmvEZJwwvHx7LVXg7iwQvpK6eAeHQ&usqp=CAU", "2w4tdavyRWnzPwjhzJJseAcm3kkrRQaTvuzAXBloRZs=", "2W+y0GwQIbcSl5vUC6DAyo6I+opkO3E9NlSa+hU7huA=", "Ed Sheeran" },
                    { 6, new DateTimeOffset(new DateTime(1940, 10, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Great Britain", new DateTimeOffset(new DateTime(2021, 7, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), " Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", "artist4@gmail.com", true, null, "https://cdn.ananasposter.ru/image/cache/catalog/poster/music/85/8817-1000x830.jpg", "xNzTPir2trd17vYgGnQyv6xs6tKVoFbloHMN9wXSi2E=", "K2M0pMRA8JCJmVqY69nhwbEW7cXnFvqhj3K8A9WqpCo=", "Paloma Mami" },
                    { 9, new DateTimeOffset(new DateTime(1942, 6, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Great Britain", new DateTimeOffset(new DateTime(2021, 7, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "It was popularised in the 1960s.", "artist7@gmail.com", true, null, "https://sites.google.com/site/korolevstvoanglia/_/rsrc/1468862873851/anglijskie-znamenitosti/the-beatles/pol-makkartni/ihJe5HHUxrE.jpg", "xldj0m3IAZ/yYdH+eaWN5FmdSCqMNxPEk4CxgbrxbXk=", "n7EefMTF/qz4DSlCLhz6SvvfaNZ5J9drrVtoYBUD15I=", "Oxxxymiron" }
                });

            migrationBuilder.InsertData(
                table: "Albums",
                columns: new[] { "Id", "AuthorId", "AuthorType", "CreatedAt", "Description", "GroupId", "IconURL", "Name", "Region", "ReleaseYear", "isPublished", "isSingle" },
                values: new object[,]
                {
                    { 3, 3, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Lorem text of the printing and typesetting industry.", null, "https://upload.wikimedia.org/wikipedia/ru/thumb/e/eb/Mccartney_album.jpg/274px-Mccartney_album.jpg", "McCartney", 1, 1970, true, true },
                    { 6, 3, 0, new DateTimeOffset(new DateTime(2021, 7, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Lorem text of the printing and typesetting industry.", null, "https://i.ibb.co/7r5Ft4n/Ellipse-42.png", "Tropical chaos", 1, 2015, true, true },
                    { 5, 3, 0, new DateTimeOffset(new DateTime(2021, 7, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Lorem text of the printing and typesetting industry.", null, "https://i.ibb.co/4SHq8NX/Ellipse-42-3.png", "Relax Work", 1, 2015, true, true },
                    { 4, 3, 0, new DateTimeOffset(new DateTime(2021, 7, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Lorem text of the printing and typesetting industry.", null, "https://s3-alpha-sig.figma.com/img/1fb9/07df/8cb83fc1826b60e1ac4136f907838260?Expires=1628467200&Signature=AYz434YZD2rEyIIGCCPLssB3aItrqVCktB59iue5-RQ68UQyUM~Vc5ek7Lc-yoItOaPgcw7r1J6eLz82wSA5zqTI9Hh7Bp7LzgD5uIM5P90QWdpYmgeCxW5u66n~~VxMy51WfAcGL8VQ2C1PTT9OpChOhrT4r9jpzFwfmJCShPZbqdRQslmU3b8oyInIdnR~XFUdf2Demw5X0NbSF4esMgkkWvT5gDdR19Q5RNyDcdG8nh5rQY~LSXRBVFmEcd5aDr8-bRMjdr36BJ0ntsF2CeUaJ1y3tJB64rgZrCZO11deVRMl6XGAlwT3I~BF~wo4vM~-qyGn4HghkFFHh~sxxw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA", "Fresh & Chill", 1, 2015, true, true },
                    { 9, 3, 0, new DateTimeOffset(new DateTime(2021, 7, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Lorem text of the printing and typesetting industry.", null, "https://i.ibb.co/7r5Ft4n/Ellipse-42.png", "Tropical chaos", 1, 2015, true, true },
                    { 10, 3, 0, new DateTimeOffset(new DateTime(2021, 7, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Lorem text of the printing and typesetting industry.", null, "https://i.ibb.co/sK5hcbn/Ellipse-42-4.png", "Beautiful People", 1, 2015, true, true },
                    { 7, 3, 0, new DateTimeOffset(new DateTime(2021, 7, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Lorem text of the printing and typesetting industry.", null, "https://i.ibb.co/sK5hcbn/Ellipse-42-4.png", "Beautiful People", 1, 2015, true, true },
                    { 2, 2, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Lorem printing and typesetting industry.", null, "https://upload.wikimedia.org/wikipedia/ru/2/2a/MindGames.jpg", "Mind Games", 1, 1973, true, false },
                    { 8, 3, 0, new DateTimeOffset(new DateTime(2021, 7, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Lorem text of the printing and typesetting industry.", null, "https://i.ibb.co/4SHq8NX/Ellipse-42-3.png", "Relax Work", 1, 2015, true, true },
                    { 1, 2, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", null, "https://upload.wikimedia.org/wikipedia/ru/6/69/ImagineCover.jpg", "Imagine", 1, 1971, true, true }
                });

            migrationBuilder.InsertData(
                table: "Playlists",
                columns: new[] { "Id", "AccessType", "AuthorId", "CreatedAt", "Description", "IconURL", "Name" },
                values: new object[,]
                {
                    { 3, 0, 1, new DateTimeOffset(new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), "It is a some page when looking at its layout.", "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "JohnLennon" },
                    { 2, 2, 1, new DateTimeOffset(new DateTime(2020, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), "It is a page when looking at its layout.", "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "Almost the Beatles" },
                    { 1, 2, 4, new DateTimeOffset(new DateTime(2020, 10, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "It is a long established fact readable content of a page when looking at its layout.", "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "Rock" }
                });

            migrationBuilder.InsertData(
                table: "RoleUser",
                columns: new[] { "RolesId", "UsersId" },
                values: new object[,]
                {
                    { 3, 1 },
                    { 2, 2 },
                    { 1, 4 },
                    { 2, 3 }
                });

            migrationBuilder.InsertData(
                table: "Songs",
                columns: new[] { "Id", "ArtistId", "AuthorType", "CreatedAt", "Duration", "GroupId", "HasCensorship", "IconURL", "Name" },
                values: new object[,]
                {
                    { 1, 3, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 2, null, false, "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "That Would Be Something" },
                    { 5, 5, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 2, null, false, "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "Bad Habits" },
                    { 7, null, 1, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 2, 1, false, "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "If I Never See Your Face Again" },
                    { 4, 2, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 3, null, false, "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "Only People" },
                    { 3, 2, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 2, null, false, "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "Imagine" },
                    { 2, 2, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 4, null, false, "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "Mind Games" },
                    { 8, null, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 3, 2, false, "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "Follow You" },
                    { 6, 6, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 4, null, false, "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "Mi Palomita" },
                    { 9, 9, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 3, null, false, "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "KONSTRUKT" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Birthday", "Country", "CreatedAt", "Description", "Email", "Gender", "GroupId", "IconURL", "Password", "Salt", "UserName" },
                values: new object[,]
                {
                    { 8, new DateTimeOffset(new DateTime(1996, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), "Poland", new DateTimeOffset(new DateTime(2021, 7, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "It has survived not only five centuries, but also the leap into electronic, remaining essentially unchanged.", "artist6@gmail.com", false, 2, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWMxxTKJB-4WptJQP94DgYzLQJMZ4U69ASOnDvNMmvEZJwwvHx7LVXg7iwQvpK6eAeHQ&usqp=CAU", "NVB3ZZEK+rqseACtraFR+RHK4sdReGavKt5IE7mw7gQ=", "jdEeMqVH6VdFQjdzLTWNT4+vHS2B3MWNQQTUYm9o984=", "Dan Reynolds" },
                    { 7, new DateTimeOffset(new DateTime(1942, 6, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Great Britain", new DateTimeOffset(new DateTime(2021, 7, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "It was popularised in the 1960s.", "artist5@gmail.com", true, 1, "https://sites.google.com/site/korolevstvoanglia/_/rsrc/1468862873851/anglijskie-znamenitosti/the-beatles/pol-makkartni/ihJe5HHUxrE.jpg", "xldj0m3IAZ/yYdH+eaWN5FmdSCqMNxPEk4CxgbrxbXk=", "n7EefMTF/qz4DSlCLhz6SvvfaNZ5J9drrVtoYBUD15I=", "Adam Levine" }
                });

            migrationBuilder.InsertData(
                table: "AlbumSong",
                columns: new[] { "AlbumsId", "SongsId" },
                values: new object[,]
                {
                    { 2, 2 },
                    { 4, 5 },
                    { 5, 5 },
                    { 6, 5 },
                    { 7, 5 },
                    { 8, 5 },
                    { 9, 5 },
                    { 10, 5 },
                    { 4, 6 },
                    { 5, 6 },
                    { 6, 6 },
                    { 7, 6 },
                    { 8, 6 },
                    { 9, 6 },
                    { 10, 6 },
                    { 4, 9 },
                    { 5, 9 },
                    { 6, 9 },
                    { 7, 9 },
                    { 8, 9 },
                    { 9, 9 },
                    { 3, 1 },
                    { 10, 9 },
                    { 10, 7 },
                    { 1, 3 },
                    { 2, 4 },
                    { 4, 7 },
                    { 4, 8 },
                    { 5, 7 },
                    { 10, 8 },
                    { 6, 7 },
                    { 6, 8 },
                    { 5, 8 },
                    { 7, 8 },
                    { 8, 7 },
                    { 8, 8 },
                    { 9, 7 },
                    { 9, 8 },
                    { 7, 7 }
                });

            migrationBuilder.InsertData(
                table: "PlaylistSong",
                columns: new[] { "Id", "CreatedAt", "PlaylistId", "SongId" },
                values: new object[,]
                {
                    { 3, new DateTimeOffset(new DateTime(2020, 10, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 1, 3 },
                    { 9, new DateTimeOffset(new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), 3, 4 },
                    { 2, new DateTimeOffset(new DateTime(2020, 10, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 1, 2 }
                });

            migrationBuilder.InsertData(
                table: "PlaylistSong",
                columns: new[] { "Id", "CreatedAt", "PlaylistId", "SongId" },
                values: new object[,]
                {
                    { 8, new DateTimeOffset(new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), 3, 3 },
                    { 6, new DateTimeOffset(new DateTime(2020, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), 2, 3 },
                    { 1, new DateTimeOffset(new DateTime(2020, 10, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 1, 1 },
                    { 7, new DateTimeOffset(new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), 3, 2 },
                    { 5, new DateTimeOffset(new DateTime(2020, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), 2, 2 },
                    { 4, new DateTimeOffset(new DateTime(2020, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), 2, 1 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 1, 3 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 2, 4 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 3, 1 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 4, 5 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 4, 6 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 4, 7 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 4, 8 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 4, 9 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 5, 5 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 5, 6 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 5, 7 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 5, 8 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 5, 9 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 6, 5 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 6, 6 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 6, 7 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 6, 8 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 6, 9 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 7, 5 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 7, 6 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 7, 7 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 7, 8 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 7, 9 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 8, 5 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 8, 6 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 8, 7 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 8, 8 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 8, 9 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 9, 5 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 9, 6 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 9, 7 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 9, 8 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 9, 9 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 10, 5 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 10, 6 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 10, 7 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 10, 8 });

            migrationBuilder.DeleteData(
                table: "AlbumSong",
                keyColumns: new[] { "AlbumsId", "SongsId" },
                keyValues: new object[] { 10, 9 });

            migrationBuilder.DeleteData(
                table: "PlaylistSong",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "PlaylistSong",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "PlaylistSong",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "PlaylistSong",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "PlaylistSong",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "PlaylistSong",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "PlaylistSong",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "PlaylistSong",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "PlaylistSong",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "RoleUser",
                keyColumns: new[] { "RolesId", "UsersId" },
                keyValues: new object[] { 1, 4 });

            migrationBuilder.DeleteData(
                table: "RoleUser",
                keyColumns: new[] { "RolesId", "UsersId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "RoleUser",
                keyColumns: new[] { "RolesId", "UsersId" },
                keyValues: new object[] { 2, 3 });

            migrationBuilder.DeleteData(
                table: "RoleUser",
                keyColumns: new[] { "RolesId", "UsersId" },
                keyValues: new object[] { 3, 1 });

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Albums",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Albums",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Albums",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Albums",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Albums",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Albums",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Albums",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Albums",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Albums",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Albums",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Playlists",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Playlists",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Playlists",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Songs",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Songs",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Songs",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Songs",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Songs",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Songs",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Songs",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Songs",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Songs",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Groups",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 9);
        }
    }
}

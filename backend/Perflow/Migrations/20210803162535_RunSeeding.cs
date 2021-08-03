using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Perflow.Migrations
{
    public partial class RunSeeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                    { 4, new DateTimeOffset(new DateTime(1996, 2, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), "Poland", new DateTimeOffset(new DateTime(2021, 7, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "It has survived not only five centuries, but also the leap into electronic, remaining essentially unchanged.", "moderator@gmail.com", false, null, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiWMxxTKJB-4WptJQP94DgYzLQJMZ4U69ASOnDvNMmvEZJwwvHx7LVXg7iwQvpK6eAeHQ&usqp=CAU", "NVB3ZZEK+rqseACtraFR+RHK4sdReGavKt5IE7mw7gQ=", "jdEeMqVH6VdFQjdzLTWNT4+vHS2B3MWNQQTUYm9o984=", "moderator" }
                });

            migrationBuilder.InsertData(
                table: "Albums",
                columns: new[] { "Id", "AuthorId", "AuthorType", "CreatedAt", "Description", "GroupId", "IconURL", "Name", "Region", "ReleaseYear", "isPublished", "isSingle" },
                values: new object[,]
                {
                    { 1, 2, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Lorem Ipsum is simply dummy text of the printing and typesetting industry.", null, "https://upload.wikimedia.org/wikipedia/ru/6/69/ImagineCover.jpg", "Imagine", 1, 1971, true, true },
                    { 2, 2, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Lorem printing and typesetting industry.", null, "https://upload.wikimedia.org/wikipedia/ru/2/2a/MindGames.jpg", "Mind Games", 1, 1973, true, false },
                    { 3, 3, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "Lorem text of the printing and typesetting industry.", null, "https://upload.wikimedia.org/wikipedia/ru/thumb/e/eb/Mccartney_album.jpg/274px-Mccartney_album.jpg", "McCartney", 1, 1970, true, true }
                });

            migrationBuilder.InsertData(
                table: "Playlists",
                columns: new[] { "Id", "AccessType", "AuthorId", "CreatedAt", "Description", "IconURL", "Name" },
                values: new object[,]
                {
                    { 2, 2, 1, new DateTimeOffset(new DateTime(2020, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), "It is a page when looking at its layout.", "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "Almost the Beatles" },
                    { 3, 0, 1, new DateTimeOffset(new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), "It is a some page when looking at its layout.", "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "JohnLennon" },
                    { 1, 2, 4, new DateTimeOffset(new DateTime(2020, 10, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), "It is a long established fact readable content of a page when looking at its layout.", "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "Rock" }
                });

            migrationBuilder.InsertData(
                table: "RoleUser",
                columns: new[] { "RolesId", "UsersId" },
                values: new object[,]
                {
                    { 3, 1 },
                    { 2, 2 },
                    { 2, 3 },
                    { 1, 4 }
                });

            migrationBuilder.InsertData(
                table: "Songs",
                columns: new[] { "Id", "AlbumId", "ArtistId", "AuthorType", "CreatedAt", "Duration", "GroupId", "HasCensorship", "IconURL", "Name" },
                values: new object[,]
                {
                    { 1, 1, 3, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 2, null, false, "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "That Would Be Something" },
                    { 2, 2, 2, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 4, null, false, "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "Mind Games" },
                    { 3, 2, 2, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 2, null, false, "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "Imagine" },
                    { 4, 3, 2, 0, new DateTimeOffset(new DateTime(2020, 9, 9, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 3, null, false, "https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg", "Only People" }
                });

            migrationBuilder.InsertData(
                table: "PlaylistSong",
                columns: new[] { "Id", "CreatedAt", "PlaylistId", "SongId" },
                values: new object[,]
                {
                    { 1, new DateTimeOffset(new DateTime(2020, 10, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 1, 1 },
                    { 4, new DateTimeOffset(new DateTime(2020, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), 2, 1 },
                    { 2, new DateTimeOffset(new DateTime(2020, 10, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 1, 2 },
                    { 5, new DateTimeOffset(new DateTime(2020, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), 2, 2 },
                    { 7, new DateTimeOffset(new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), 3, 2 },
                    { 3, new DateTimeOffset(new DateTime(2020, 10, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 3, 0, 0, 0)), 1, 3 },
                    { 6, new DateTimeOffset(new DateTime(2020, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), 2, 3 },
                    { 8, new DateTimeOffset(new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), 3, 3 },
                    { 9, new DateTimeOffset(new DateTime(2020, 12, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 2, 0, 0, 0)), 3, 4 }
                });

            migrationBuilder.InsertData(
                table: "SongReactions",
                columns: new[] { "Id", "SongId", "UserId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 3, 1 },
                    { 3, 4, 1 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
                table: "SongReactions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "SongReactions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "SongReactions",
                keyColumn: "Id",
                keyValue: 3);

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
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace Perflow.Migrations
{
    public partial class AlbumReactionSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isSingle",
                table: "Albums",
                newName: "IsSingle");

            migrationBuilder.RenameColumn(
                name: "isPublished",
                table: "Albums",
                newName: "IsPublished");

            migrationBuilder.InsertData(
                table: "AlbumReactions",
                columns: new[] { "Id", "AlbumId", "UserId" },
                values: new object[] { 1, 1, 1 });

            migrationBuilder.InsertData(
                table: "AlbumReactions",
                columns: new[] { "Id", "AlbumId", "UserId" },
                values: new object[] { 2, 2, 1 });

            migrationBuilder.InsertData(
                table: "AlbumReactions",
                columns: new[] { "Id", "AlbumId", "UserId" },
                values: new object[] { 3, 3, 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AlbumReactions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "AlbumReactions",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "AlbumReactions",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.RenameColumn(
                name: "IsSingle",
                table: "Albums",
                newName: "isSingle");

            migrationBuilder.RenameColumn(
                name: "IsPublished",
                table: "Albums",
                newName: "isPublished");
        }
    }
}

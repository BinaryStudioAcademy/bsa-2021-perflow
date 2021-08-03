using Microsoft.EntityFrameworkCore.Migrations;

namespace Perflow.Migrations
{
    public partial class ArtistReactionsSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "ArtistReactions",
                columns: new[] { "Id", "ArtistId", "UserId" },
                values: new object[] { 1, 2, 1 });

            migrationBuilder.InsertData(
                table: "ArtistReactions",
                columns: new[] { "Id", "ArtistId", "UserId" },
                values: new object[] { 2, 3, 1 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ArtistReactions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "ArtistReactions",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}

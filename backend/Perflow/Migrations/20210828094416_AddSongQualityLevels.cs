using Microsoft.EntityFrameworkCore.Migrations;

namespace Perflow.Migrations
{
    public partial class AddSongQualityLevels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BlobId",
                table: "Songs",
                newName: "SourceBlobId");

            migrationBuilder.AddColumn<string>(
                name: "HighBlobId",
                table: "Songs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LowBlobId",
                table: "Songs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MediumBlobId",
                table: "Songs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VeryHighBlobId",
                table: "Songs",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HighBlobId",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "LowBlobId",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "MediumBlobId",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "VeryHighBlobId",
                table: "Songs");

            migrationBuilder.RenameColumn(
                name: "SourceBlobId",
                table: "Songs",
                newName: "BlobId");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace Perflow.Migrations
{
    public partial class AddBlobId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BlobId",
                table: "Songs",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BlobId",
                table: "Songs");
        }
    }
}

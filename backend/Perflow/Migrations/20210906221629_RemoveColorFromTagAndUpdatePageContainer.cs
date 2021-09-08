using Microsoft.EntityFrameworkCore.Migrations;

namespace Perflow.Migrations
{
    public partial class RemoveColorFromTagAndUpdatePageContainer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Color",
                table: "Tags");

            migrationBuilder.AddColumn<bool>(
                name: "ShowRecommendations",
                table: "PageContainers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShowRecommendations",
                table: "PageContainers");

            migrationBuilder.AddColumn<string>(
                name: "Color",
                table: "Tags",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true);
        }
    }
}

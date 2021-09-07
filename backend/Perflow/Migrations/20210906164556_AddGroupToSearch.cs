using Microsoft.EntityFrameworkCore.Migrations;

namespace Perflow.Migrations
{
    public partial class AddGroupToSearch : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "GroupId",
                table: "SearchHistory",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_SearchHistory_GroupId",
                table: "SearchHistory",
                column: "GroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_SearchHistory_Groups_GroupId",
                table: "SearchHistory",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SearchHistory_Groups_GroupId",
                table: "SearchHistory");

            migrationBuilder.DropIndex(
                name: "IX_SearchHistory_GroupId",
                table: "SearchHistory");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "SearchHistory");
        }
    }
}

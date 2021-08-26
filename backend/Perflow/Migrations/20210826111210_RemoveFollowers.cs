using Microsoft.EntityFrameworkCore.Migrations;

namespace Perflow.Migrations
{
    public partial class RemoveFollowers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArtistFollower");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ArtistFollower",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ArtistId = table.Column<int>(type: "int", nullable: false),
                    FollowerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtistFollower", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ArtistFollower_Users_ArtistId",
                        column: x => x.ArtistId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ArtistFollower_Users_FollowerId",
                        column: x => x.FollowerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArtistFollower_ArtistId",
                table: "ArtistFollower",
                column: "ArtistId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtistFollower_FollowerId",
                table: "ArtistFollower",
                column: "FollowerId");
        }
    }
}

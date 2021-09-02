using Microsoft.EntityFrameworkCore.Migrations;

namespace Perflow.Migrations
{
    public partial class AddContentSynchronizationTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContentSynchronization",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    SongId = table.Column<int>(type: "int", nullable: false),
                    Time = table.Column<int>(type: "int", nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentSynchronization", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContentSynchronization_Songs_SongId",
                        column: x => x.SongId,
                        principalTable: "Songs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ContentSynchronization_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContentSynchronization_SongId",
                table: "ContentSynchronization",
                column: "SongId");

            migrationBuilder.CreateIndex(
                name: "IX_ContentSynchronization_UserId",
                table: "ContentSynchronization",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContentSynchronization");
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Perflow.Migrations
{
    public partial class AddSearchHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SearchHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    AlbumId = table.Column<int>(type: "int", nullable: true),
                    PlaylistId = table.Column<int>(type: "int", nullable: true),
                    ArtistId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SearchHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SearchHistory_Albums_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "Albums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SearchHistory_Playlists_PlaylistId",
                        column: x => x.PlaylistId,
                        principalTable: "Playlists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SearchHistory_Users_ArtistId",
                        column: x => x.ArtistId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SearchHistory_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SearchHistory_AlbumId",
                table: "SearchHistory",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_SearchHistory_ArtistId",
                table: "SearchHistory",
                column: "ArtistId");

            migrationBuilder.CreateIndex(
                name: "IX_SearchHistory_PlaylistId",
                table: "SearchHistory",
                column: "PlaylistId");

            migrationBuilder.CreateIndex(
                name: "IX_SearchHistory_UserId",
                table: "SearchHistory",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SearchHistory");
        }
    }
}

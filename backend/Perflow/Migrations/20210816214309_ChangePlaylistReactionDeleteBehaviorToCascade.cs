using Microsoft.EntityFrameworkCore.Migrations;

namespace Perflow.Migrations
{
    public partial class ChangePlaylistReactionDeleteBehaviorToCascade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaylistReactions_Playlists_PlaylistId",
                table: "PlaylistReactions");

            migrationBuilder.AddForeignKey(
                name: "FK_PlaylistReactions_Playlists_PlaylistId",
                table: "PlaylistReactions",
                column: "PlaylistId",
                principalTable: "Playlists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaylistReactions_Playlists_PlaylistId",
                table: "PlaylistReactions");

            migrationBuilder.AddForeignKey(
                name: "FK_PlaylistReactions_Playlists_PlaylistId",
                table: "PlaylistReactions",
                column: "PlaylistId",
                principalTable: "Playlists",
                principalColumn: "Id");
        }
    }
}

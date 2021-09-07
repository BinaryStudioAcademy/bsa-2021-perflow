export interface WriteSearchHistory {
  userId: number,
  albumId: number | null,
  artistId: number | null,
  playlistId: number | null,
  groupId: number | null
}

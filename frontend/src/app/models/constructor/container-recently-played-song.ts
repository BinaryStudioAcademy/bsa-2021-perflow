import { RecentlyPlayedSongAlbum } from './recently-played-song-album';

export interface ConstructorRecentlyPlayedSong {
  name: string;
  artist: string | null;
  group: string | null;
  album: RecentlyPlayedSongAlbum | null;
  playlist: string | null;
}

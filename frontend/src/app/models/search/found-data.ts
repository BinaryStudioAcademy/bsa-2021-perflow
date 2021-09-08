import { AlbumForReadDTO } from '../album/albumForReadDTO';
import { PlaylistView } from '../playlist/playlist-view';
import { Song } from '../song/song';
import { ArtistReadDTO } from '../user/ArtistReadDTO';

export interface FoundData {
  songs: Array<Song>,
  albums: Array<AlbumForReadDTO>,
  artists: Array<ArtistReadDTO>,
  playlists: Array<PlaylistView>,
  groups: Array<ArtistReadDTO>
}

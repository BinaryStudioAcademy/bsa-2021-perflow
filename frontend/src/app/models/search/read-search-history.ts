import { AlbumForReadDTO } from '../album/albumForReadDTO';
import { PlaylistView } from '../playlist/playlist-view';
import { ArtistReadDTO } from '../user/ArtistReadDTO';

export interface ReadSearchHistory {
  userId: number,
  album: AlbumForReadDTO,
  artist: ArtistReadDTO,
  playlist: PlaylistView,
  group: ArtistReadDTO
}

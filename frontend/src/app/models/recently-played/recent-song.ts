import { AlbumForReadDTO } from '../album/albumForReadDTO';
import { Group } from '../group/group';
import { PlaylistView } from '../playlist/playlist-view';
import { ArtistReadDTO } from '../user/ArtistReadDTO';

export interface RecentlyPlayedSong {
  id: number;
  name: string;
  artist: ArtistReadDTO;
  group: Group;
  album: AlbumForReadDTO;
  playlist: PlaylistView;
}

import { SongView } from '../song/song-view';

export interface AlbumView {
  id: number,
  name: string,
  iconURL: string,
  description: string,
  isSingle: boolean,
  reactions: number,
  songs: Array<SongView>
}

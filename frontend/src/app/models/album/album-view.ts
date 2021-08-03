import { SongView } from "../song/song-view";

export interface AlbumView {
  name: string,
  iconURL: string,
  isSingle: boolean,
  reactions: number,
  songs: Array<SongView>
}
import { AlbumAuthor } from '../user/album-author';

export interface AlbumView {
  id: number,
  name: string,
  iconURL: string,
  description: string,
  isSingle: boolean,
  reactions: number,
  authors: Array<AlbumAuthor>
}

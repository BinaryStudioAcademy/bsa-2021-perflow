import { AlbumAuthor } from '../user/album-author';

export interface NewReleaseView {
  id: number,
  name: string,
  iconURL: string,
  authors: Array<AlbumAuthor>
}

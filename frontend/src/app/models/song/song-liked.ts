import { AlbumName } from '../album/album-name';
import { AlbumAuthor } from '../user/album-author';

export interface SongLiked {
  id: number;
  name: string;
  duration: number;
  hasCensorship: boolean;
  author: AlbumAuthor;
  album: AlbumName;
  isLiked: boolean;
}

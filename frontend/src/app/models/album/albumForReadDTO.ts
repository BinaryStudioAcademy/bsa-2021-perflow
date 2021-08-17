import { AlbumAuthor } from '../user/album-author';

export class AlbumForReadDTO {
  id: number;
  name: string;
  releaseYear: number;
  iconURL: string;
  author: AlbumAuthor;
}

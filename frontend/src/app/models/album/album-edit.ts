import { AuthorType } from '../enums/author-type.enum';
import { AlbumRegion } from './album-region';

export interface AlbumEdit {
  id: number,
  createdAt: Date,
  name: string,
  releaseYear: number,
  iconURL: string,
  description: string,
  albumRegion: AlbumRegion,
  isPublished: boolean,
  authorType: AuthorType,
  artistId: number | undefined,
  groupId: number | undefined,
  isSingle: boolean
}

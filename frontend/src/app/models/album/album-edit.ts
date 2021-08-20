import { AuthorType } from '../enums/author-type.enum';
import { AlbumRegion } from './album-region';

export interface AlbumEdit {
  id: number,
  createdAt: Date,
  name: string,
  releaseYear: number | undefined,
  iconURL: string,
  description: string,
  region: AlbumRegion,
  isPublished: boolean,
  authorType: AuthorType,
  authorId: number | undefined,
  groupId: number | undefined,
  isSingle: boolean,
  icon?: File
}

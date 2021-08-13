import { AuthorType } from '../enums/author-type.enum';
import { Group } from '../group/group';
import { Song } from '../song/song';
import { User } from '../user/user';
import { AlbumRegion } from './album-region';

export interface AlbumFull {
  id: number;
  name: string;
  description: string,
  region: AlbumRegion,
  isPublished: boolean,
  authorType: AuthorType,
  isSingle: boolean,
  iconURL: string;
  artist?: User;
  group?: Group;
  releaseYear: number;
  songs: Song[];
}

import { Group } from '../group/group';
import { Song } from '../song/song';
import { User } from '../user/user';

export interface AlbumFull {
  id: number;
  name: string;
  iconURL: string;
  artist?: User;
  group?: Group;
  releaseYear: number;
  songs: Song[];
}

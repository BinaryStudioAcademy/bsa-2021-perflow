import { Album } from '../album/album';
import { User } from '../user/user';
import { AuthorType } from '../enums/author-type.enum';
import { Group } from '../group/group';

export interface Song {
  id: number;
  name: string;
  createdAt: Date;
  iconURL: string;
  duration: number;
  hasCensorship: boolean;
  album: Album;
  frequency: number;
  artist?: User;
  authorType: AuthorType;
  isLiked: boolean;
  group?: Group;
  podcast: string;
}

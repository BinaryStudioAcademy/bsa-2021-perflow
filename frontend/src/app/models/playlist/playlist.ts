import { AccessType } from './accessType';
import { User } from '../user/user';
import { Song } from '../song/song';

export interface Playlist {
  id: number;
  createdAt: Date;
  name: string;
  description: string;
  iconURL: string;
  author: User;
  accessType: AccessType;
  songs: Song[];
  isLiked: boolean;
}

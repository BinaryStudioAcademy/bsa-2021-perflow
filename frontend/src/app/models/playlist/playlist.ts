import { AccessType } from './accessType';
import { User } from '../user/user';
import { Song } from '../song/song';
import { PlaylistType } from '../enums/playlist-type';

export interface Playlist {
  id: number;
  createdAt: Date;
  name: string;
  description: string;
  iconURL: string;
  author: User;
  accessType: AccessType;
  type: PlaylistType;
  songs: Song[];
  isLiked: boolean;
}

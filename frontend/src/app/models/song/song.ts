import { Album } from '../album';
import { User } from '../user/user';

export interface Song {
  id: number;
  name: string;
  createdAt: Date;
  iconURL: string;
  duration: number;
  hasCensorship: boolean;
  album: Album;
  artist: User;

  // TODO: add fields
}

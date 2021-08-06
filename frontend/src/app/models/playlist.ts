import { User } from './user/user';

export interface Playlist {
  id: number;
  createdAt: Date;
  name: string;
  description: string;
  iconURL: string;
  author?: User;
}

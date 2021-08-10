import { Album } from '../album/album';

export interface Artist {
  id: number;
  userName: string;
  iconURL: string;
  description: string;
  country: string;
  albums: Album[];
}

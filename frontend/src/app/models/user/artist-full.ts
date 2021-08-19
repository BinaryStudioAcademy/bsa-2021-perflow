import { Album } from '../album/album';

export interface ArtistFull {
  id: number;
  userName: string;
  iconURL: string;
  description: string;
  country: string;
  isLiked: boolean;
  albums: Album[];
}

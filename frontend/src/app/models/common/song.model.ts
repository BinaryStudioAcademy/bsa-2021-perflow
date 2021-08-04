import { Album } from './album.model';
import { Artist } from './artist.model';

export interface Song {
  id: number;
  name: string;
  createdAt: Date;
  iconURL: string;
  duration: number;
  hasCensorship: boolean;
  album: Album;
  artist: Artist;

  // TODO: add fields
}

import { Album } from './album.model';
import { Artist } from './artist.model';
import { AuthorType } from './enums/author-type.enum';

export interface Song {
  id: number;
  name: string;
  createdAt: Date;
  iconURL: string;
  duration: number;
  hasCensorship: boolean;
  album: Album;
  artist: Artist;
  authorType: AuthorType;

  // TODO: add fields
}

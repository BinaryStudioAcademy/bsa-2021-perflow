import { Album } from '../album/album';
import { User } from '../user/user';
import { AuthorType } from '../enums/author-type.enum';

export interface Song {
  id: number;
  name: string;
  createdAt: Date;
  iconURL: string;
  duration: number;
  hasCensorship: boolean;
  album: Album;
  artist: User;
  authorType: AuthorType;
  blobId: string;

  // TODO: add fields
  podcast: string;
}

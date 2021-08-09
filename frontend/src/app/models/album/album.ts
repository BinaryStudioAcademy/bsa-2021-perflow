import { User } from '../user/user';

export interface Album {
  id: number;
  name: string;
  iconURL: string;
  author: User;
  releaseYear: number;

  // TODO: add fields
}

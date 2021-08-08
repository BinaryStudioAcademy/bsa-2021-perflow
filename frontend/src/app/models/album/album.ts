import { User } from "../user/user";

export interface Album {
  id: number;
  name: string;
  iconURL: string;
  description: string;
  artist: User; 
  releaseYear: number;

  // TODO: add fields
}

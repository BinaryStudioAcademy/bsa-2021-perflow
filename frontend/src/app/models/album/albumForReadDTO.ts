import { ArtistReadDTO } from '../user/ArtistReadDTO';

export class AlbumForReadDTO {
  id: number;
  name: string;
  releaseYear: number;
  iconURL: string;
  author: ArtistReadDTO;
}

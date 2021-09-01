export interface NewestFiveAlbum {
  id: number;
  name: string;
  description: string;
  iconURL: string;
  isLiked: boolean;
  artistId?: number
}

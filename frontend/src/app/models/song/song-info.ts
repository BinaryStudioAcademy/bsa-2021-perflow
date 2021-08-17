export class SongInfo {
  id: number;
  name: string;
  artistName: string;
  songURL: string;
  imageURL: string;

  constructor(id: number, name: string, artistName: string, songURL: string, imageURL: string) {
    this.id = id;
    this.name = name;
    this.artistName = artistName;
    this.songURL = songURL;
    this.imageURL = imageURL;
  }
}

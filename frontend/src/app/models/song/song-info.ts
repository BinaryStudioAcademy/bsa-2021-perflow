export class SongInfo {
  name: string;
  artistName: string;
  songURL: string;
  imageURL: string;
  constructor(name: string, artistName: string, songURL: string, imageURL: string) {
    this.name = name;
    this.artistName = artistName;
    this.songURL = songURL;
    this.imageURL = imageURL;
  }
}

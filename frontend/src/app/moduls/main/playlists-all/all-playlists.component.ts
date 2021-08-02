import { Album } from './../../../models/album';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all-playlists',
  templateUrl: './all-playlists.component.html',
  styleUrls: ['./all-playlists.component.sass']
})
export class AllPlaylistsComponent {
// TODO: Here insert array count songs
  likedSongs: number = 256;
// TODO: tempolary albums
  albums: Album[] = [
    {
      id: 1,
      titleImage: './../../../../assets/tepolary-images/card-title-1.png',
      nameAlbum: "Fresh & Chill",
      songs: [
        "Ed Sheeran",
        "Paloma Mami Maroon 5",
        "SigalaPink",
        "Oximer"
      ]
    },
    {
      id: 2,
      titleImage: './../../../../assets/tepolary-images/card-title-2.png',
      nameAlbum: "Imagine Dragons",
      songs: [
        "Believer",
        "Natural",
        "Thunder",
        "Bad Liar"
      ]
    },
    {
      id: 3,
      titleImage: './../../../../assets/tepolary-images/card-title-3.png',
      nameAlbum: "Tropical chaos",
      songs: [
        "Ed Sheeran",
        "Paloma Mami Maroon 5",
        "SigalaPink",
        "Oximer"
      ]
    },
    {
      id: 3,
      titleImage: './../../../../assets/tepolary-images/card-title-4.png',
      nameAlbum: "Relax work",
      songs: [
        "Ed Sheeran",
        "Paloma Mami Maroon 5",
        "SigalaPink",
        "Oximer"
      ]
    },   
  ];
}

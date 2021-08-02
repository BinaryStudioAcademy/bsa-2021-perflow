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
  allTemplary: Album[] = [
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
      id: 4,
      titleImage: './../../../../assets/tepolary-images/card-title-4.png',
      nameAlbum: "Relax work",
      songs: [
        "Ed Sheeran",
        "Paloma Mami Maroon 5",
        "SigalaPink",
        "Oximer"
      ]
    }, 
    {
      id: 5,
      titleImage: './../../../../assets/tepolary-images/my-playlists-1.png',
      nameAlbum: "Fresh & Chill",
      songs: [
        "Ed Sheeran",
        "Paloma Mami Maroon 5",
        "SigalaPink",
        "Oximer"
      ]
    },
    {
      id: 6,
      titleImage: './../../../../assets/tepolary-images/my-playlists-2.png',
      nameAlbum: "Imagine Dragons",
      songs: [
        "Believer",
        "Natural",
        "Thunder",
        "Bad Liar"
      ]
    },
    {
      id: 7,
      titleImage: './../../../../assets/tepolary-images/my-playlists-3.png',
      nameAlbum: "Tropical chaos",
      songs: [
        "Ed Sheeran",
        "Paloma Mami Maroon 5",
        "SigalaPink",
        "Oximer"
      ]
    },
    {
      id: 8,
      titleImage: './../../../../assets/tepolary-images/my-playlists-4.png',
      nameAlbum: "Relax work",
      songs: [
        "Ed Sheeran",
        "Paloma Mami Maroon 5",
        "SigalaPink",
        "Oximer"
      ]
    },   
    {
      id: 9,
      titleImage: './../../../../assets/tepolary-images/my-playlists-1.png',
      nameAlbum: "Fresh & Chill",
      songs: [
        "Ed Sheeran",
        "Paloma Mami Maroon 5",
        "SigalaPink",
        "Oximer"
      ]
    },
    {
      id: 10,
      titleImage: './../../../../assets/tepolary-images/my-playlists-2.png',
      nameAlbum: "Imagine Dragons",
      songs: [
        "Believer",
        "Natural",
        "Thunder",
        "Bad Liar"
      ]
    },
    {
      id: 11,
      titleImage: './../../../../assets/tepolary-images/my-playlists-3.png',
      nameAlbum: "Tropical chaos",
      songs: [
        "Ed Sheeran",
        "Paloma Mami Maroon 5",
        "SigalaPink",
        "Oximer"
      ]
    },
    {
      id: 12,
      titleImage: './../../../../assets/tepolary-images/my-playlists-1.png',
      nameAlbum: "Relax work",
      songs: [
        "Ed Sheeran",
        "Paloma Mami Maroon 5",
        "SigalaPink",
        "Oximer"
      ]
    },     
  ];

  albums = this.allTemplary.slice(0, 4);
  playlists = this.allTemplary.slice(4, 11);
}

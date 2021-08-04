import { Component } from '@angular/core';
import { Album } from '../../../models/album';

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
      nameAlbum: 'Fresh & Chill',
      songs: [
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Oximer',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink'
      ]
    },
    {
      id: 2,
      titleImage: './../../../../assets/tepolary-images/card-title-2.png',
      nameAlbum: 'Imagine Dragons',
      songs: [
        'Believer',
        'Natural',
        'Thunder',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Oximer',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink'
      ]
    },
    {
      id: 3,
      titleImage: './../../../../assets/tepolary-images/card-title-3.png',
      nameAlbum: 'Tropical chaos',
      songs: [
        'Ed Sheeran',
        'Paloma Mami Maroon 5',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Oximer',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink'
      ]
    },
    {
      id: 4,
      titleImage: './../../../../assets/tepolary-images/card-title-4.png',
      nameAlbum: 'Relax work',
      songs: [
        'Ed Sheeran',
        'Paloma Mami Maroon 5',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Oximer',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink'
      ]
    },
    {
      id: 5,
      titleImage: './../../../../assets/tepolary-images/my-playlists-1.png',
      nameAlbum: 'Fresh & Chill',
      songs: [
        'Ed Sheeran',
        'Paloma Mami Maroon 5',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Oximer',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink'
      ]
    },
    {
      id: 6,
      titleImage: './../../../../assets/tepolary-images/my-playlists-2.png',
      nameAlbum: 'Imagine Dragons',
      songs: [
        'Believer',
        'Natural',
        'Thunder',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Oximer',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink'
      ]
    },
    {
      id: 7,
      titleImage: './../../../../assets/tepolary-images/my-playlists-3.png',
      nameAlbum: 'Tropical chaos',
      songs: [
        'Ed Sheeran',
        'Paloma Mami Maroon 5',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Oximer',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink'
      ]
    },
    {
      id: 8,
      titleImage: './../../../../assets/tepolary-images/my-playlists-4.png',
      nameAlbum: 'Relax work',
      songs: [
        'Ed Sheeran',
        'Paloma Mami Maroon 5',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Oximer',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink'
      ]
    },
    {
      id: 9,
      titleImage: './../../../../assets/tepolary-images/my-playlists-1.png',
      nameAlbum: 'Fresh & Chill',
      songs: [
        'Ed Sheeran',
        'Paloma Mami Maroon 5',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Oximer',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink'
      ]
    },
    {
      id: 10,
      titleImage: './../../../../assets/tepolary-images/my-playlists-2.png',
      nameAlbum: 'Imagine Dragons',
      songs: [
        'Believer',
        'Natural',
        'Thunder',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Oximer',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink'
      ]
    },
    {
      id: 11,
      titleImage: './../../../../assets/tepolary-images/my-playlists-3.png',
      nameAlbum: 'Tropical chaos',
      songs: [
        'Ed Sheeran',
        'Paloma Mami Maroon 5',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Oximer',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink'
      ]
    },
    {
      id: 12,
      titleImage: './../../../../assets/tepolary-images/my-playlists-1.png',
      nameAlbum: 'Relax work',
      songs: [
        'Ed Sheeran',
        'Paloma Mami Maroon 5',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Oximer',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink',
        'Ed Sheeran',
        'Bad Liar',
        'SigalaPink'
      ]
    }
  ];

  albums = this.allTemplary.slice(4, 8);
  playlists = this.allTemplary.slice(4, 11);
}

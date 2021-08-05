import { Component } from '@angular/core';
import { Playlist } from '../../../models/playlist';
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
  allAlbums: Album[] = [
    {
      id: 1,
      titleImage: './../../../../assets/tepolary-images/castle-big-image.jpeg',
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

  // TODO: we only have to transfer 4 albums
  albums = this.allAlbums.slice(0, 4);
  allPlaylist: Playlist[] = [
    {
      id: 1,
      titleImage: './../../../../assets/tepolary-images/castle-big-image.jpeg',
      namePlaylist: 'Fresh & Chill. When I home or work',
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
      titleImage: './../../../../assets/tepolary-images/my-playlists-1.png',
      namePlaylist: 'Tropical chaos',
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
      id: 3,
      titleImage: './../../../../assets/tepolary-images/my-playlists-7.png',
      namePlaylist: 'Hot mood',
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
      id: 4,
      titleImage: './../../../../assets/tepolary-images/my-playlists-8.jpeg',
      namePlaylist: 'Beautiful People',
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
      id: 5,
      titleImage: './../../../../assets/tepolary-images/my-playlists-4.png',
      namePlaylist: 'Beautiful People',
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
      id: 6,
      titleImage: './../../../../assets/tepolary-images/my-playlists-5.png',
      namePlaylist: 'Fresh & Chill',
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
      id: 7,
      titleImage: './../../../../assets/tepolary-images/my-playlists-6.png',
      namePlaylist: 'Beautiful People',
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
      id: 8,
      titleImage: './../../../../assets/tepolary-images/my-playlists-2.png',
      namePlaylist: 'Fresh & Chill',
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
      id: 9,
      titleImage: './../../../../assets/tepolary-images/my-playlists-1.png',
      namePlaylist: 'Fresh & Chill',
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
      id: 10,
      titleImage: './../../../../assets/tepolary-images/my-playlists-5.png',
      namePlaylist: 'Tropical chaos',
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
      id: 11,
      titleImage: './../../../../assets/tepolary-images/my-playlists-6.png',
      namePlaylist: 'Fresh & Chill',
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
      id: 12,
      titleImage: './../../../../assets/tepolary-images/my-playlists-2.png',
      namePlaylist: 'OneRepublic',
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
      id: 13,
      titleImage: './../../../../assets/tepolary-images/castle-big-image.jpeg',
      namePlaylist: 'Tropical chaos',
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
      id: 14,
      titleImage: './../../../../assets/tepolary-images/my-playlists-7.png',
      namePlaylist: 'OneRepublic',
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
      id: 15,
      titleImage: './../../../../assets/tepolary-images/my-playlists-8.jpeg',
      namePlaylist: 'Hot mood',
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
      id: 16,
      titleImage: './../../../../assets/tepolary-images/my-playlists-2.png',
      namePlaylist: 'Fresh & Chill',
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
      id: 17,
      titleImage: './../../../../assets/tepolary-images/my-playlists-4.png',
      namePlaylist: 'OneRepublic',
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
      id: 18,
      titleImage: './../../../../assets/tepolary-images/castle-big-image.jpeg',
      namePlaylist: 'Hot mood',
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
      id: 19,
      titleImage: './../../../../assets/tepolary-images/my-playlists-1.png',
      namePlaylist: 'Beautiful People',
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
      id: 20,
      titleImage: './../../../../assets/tepolary-images/my-playlists-7.png',
      namePlaylist: 'OneRepublic',
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
    }
  ];

  playlists = this.allPlaylist;
}

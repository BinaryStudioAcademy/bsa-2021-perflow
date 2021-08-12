import { Component } from '@angular/core';
import { Playlist } from '../../../models/playlist/playlist';
import { Album } from '../../../models/album/album';

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
      image: './../../../../assets/tempolary-images/castle-big-image.jpeg',
      name: 'Fresh & Chill',
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
      image: './../../../../assets/tempolary-images/card-title-2.png',
      name: 'Imagine Dragons',
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
      image: './../../../../assets/tempolary-images/card-title-3.png',
      name: 'Tropical chaos',
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
      image: './../../../../assets/tempolary-images/card-title-4.png',
      name: 'Relax work',
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
      image: './../../../../assets/tempolary-images/my-playlists-1.png',
      name: 'Fresh & Chill',
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
      image: './../../../../assets/tempolary-images/my-playlists-2.png',
      name: 'Imagine Dragons',
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
      image: './../../../../assets/tempolary-images/my-playlists-3.png',
      name: 'Tropical chaos',
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
      image: './../../../../assets/tempolary-images/my-playlists-4.png',
      name: 'Relax work',
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
      image: './../../../../assets/tempolary-images/my-playlists-1.png',
      name: 'Fresh & Chill',
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
      image: './../../../../assets/tempolary-images/my-playlists-2.png',
      name: 'Imagine Dragons',
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
      image: './../../../../assets/tempolary-images/my-playlists-3.png',
      name: 'Tropical chaos',
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
      image: './../../../../assets/tempolary-images/my-playlists-1.png',
      name: 'Relax work',
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
      image: './../../../../assets/tempolary-images/my-playlists-2.png',
      name: 'Imagine Dragons',
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
      image: './../../../../assets/tempolary-images/my-playlists-3.png',
      name: 'Tropical chaos',
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
      image: './../../../../assets/tempolary-images/my-playlists-4.png',
      name: 'Relax work',
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
      image: './../../../../assets/tempolary-images/my-playlists-1.png',
      name: 'Fresh & Chill',
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
      image: './../../../../assets/tempolary-images/my-playlists-2.png',
      name: 'Imagine Dragons',
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
      image: './../../../../assets/tempolary-images/my-playlists-3.png',
      name: 'Tropical chaos',
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
      image: './../../../../assets/tempolary-images/my-playlists-1.png',
      name: 'Relax work',
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
      image: './../../../../assets/tempolary-images/my-playlists-3.png',
      name: 'Fresh & Chill. When I home or work',
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
      image: './../../../../assets/tempolary-images/my-playlists-1.png',
      name: 'Tropical chaos',
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
      image: './../../../../assets/tempolary-images/my-playlists-7.png',
      name: 'Hot mood',
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
      image: './../../../../assets/tempolary-images/my-playlists-8.jpeg',
      name: 'Beautiful People',
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
      image: './../../../../assets/tempolary-images/my-playlists-4.png',
      name: 'Beautiful People',
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
      image: './../../../../assets/tempolary-images/my-playlists-5.png',
      name: 'Fresh & Chill',
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
      image: './../../../../assets/tempolary-images/my-playlists-6.png',
      name: 'Beautiful People',
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
      image: './../../../../assets/tempolary-images/my-playlists-2.png',
      name: 'Fresh & Chill',
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
      image: './../../../../assets/tempolary-images/my-playlists-1.png',
      name: 'Fresh & Chill',
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
      image: './../../../../assets/tempolary-images/my-playlists-5.png',
      name: 'Tropical chaos',
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
      image: './../../../../assets/tempolary-images/my-playlists-6.png',
      name: 'Fresh & Chill',
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
      image: './../../../../assets/tempolary-images/my-playlists-2.png',
      name: 'OneRepublic',
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
      image: './../../../../assets/tempolary-images/castle-big-image.jpeg',
      name: 'Tropical chaos',
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
      image: './../../../../assets/tempolary-images/my-playlists-7.png',
      name: 'OneRepublic',
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
      image: './../../../../assets/tempolary-images/my-playlists-8.jpeg',
      name: 'Hot mood',
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
      image: './../../../../assets/tempolary-images/my-playlists-2.png',
      name: 'Fresh & Chill',
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
      image: './../../../../assets/tempolary-images/my-playlists-4.png',
      name: 'OneRepublic',
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
      image: './../../../../assets/tempolary-images/castle-big-image.jpeg',
      name: 'Hot mood',
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
      image: './../../../../assets/tempolary-images/my-playlists-1.png',
      name: 'Beautiful People',
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
      image: './../../../../assets/tempolary-images/my-playlists-7.png',
      name: 'OneRepublic',
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

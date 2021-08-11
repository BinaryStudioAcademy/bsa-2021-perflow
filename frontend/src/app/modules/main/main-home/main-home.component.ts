import { Component, OnDestroy, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist';
import { HttpResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { AlbumView } from 'src/app/models/album/album-view';
import { Mix } from 'src/app/models/mix/mix';
import { Playlist } from 'src/app/models/playlist/playlist';
import { SongTest } from 'src/app/models/tempolary-folder/song-test';
import { AlbumService } from 'src/app/services/album.service';
<<<<<<< HEAD
import { AuthService } from 'src/app/services/auth/auth.service';
import { Album } from '../../../models/album/album';
=======
import { Subject } from 'rxjs';
>>>>>>> merge

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.sass']
})
export class MainHomeComponent implements OnInit, OnDestroy {
  private _newestCounter: number = 1;
  private _newestAlbums = new Array<object>(); // Top 5 the newest albums. it's necessary to add  {{...}} to .html

  private readonly _newestAlbumsMax: number = 5;
  private readonly _animationDuration: number = 800;

  public currentNewestAlbum = this._newestAlbums[0];
  public recentlyPlayed = new Array<object>(); // Only 8 items
  public newReleases: AlbumView[] = [];
  public calmRhythms = new Array<Playlist>();
  public yourMix = new Array<object>();
  public top100Songs = new Array<Playlist>();

  private _unsubscribe$ = new Subject<void>();

<<<<<<< HEAD
  // TODO: tempolary albums and seetings
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
      id: 13,
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
      id: 14,
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
      id: 15,
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
      id: 16,
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
      id: 17,
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
      id: 18,
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
      id: 19,
      image: './../../../../assets/tempolary-images/my-playlists-1.png',
      name: 'I last album in group',
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
  allPlaylists: Playlist[] = [
    {
      id: 1,
      image: './../../../../assets/tempolary-images/castle-big-image.jpeg',
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
  allSongs: SongTest[] = [
    {
      name: 'your broke me first',
      iconURL: '../../../../assets/tempolary-images/madonna.jpg',
      artist: 'Madonna',
      podcast: 'Rain on me'
    },
    {
      name: 'Therefore I am',
      iconURL: '../../../../assets/tempolary-images/crazy.jpg',
      artist: 'Madonna',
      podcast: 'Motivation'
    },
    {
      name: 'Positions',
      iconURL: '../../../../assets/tempolary-images/other.jpg',
      artist: 'Madonna',
      podcast: 'Rain on me'
    },
    {
      name: 'your broke me first',
      iconURL: '../../../../assets/tempolary-images/alien.jpg',
      artist: 'Madonna',
      podcast: 'Positions'
    },
    {
      name: 'your broke me first',
      iconURL: '../../../../assets/tempolary-images/madonna.jpg',
      artist: 'Madonna',
      podcast: 'Rain on me'
    },
    {
      name: 'Therefore I am',
      iconURL: '../../../../assets/tempolary-images/crazy.jpg',
      artist: 'Madonna',
      podcast: 'Motivation'
    },
    {
      name: 'Positions',
      iconURL: '../../../../assets/tempolary-images/other.jpg',
      artist: 'Madonna',
      podcast: 'Rain on me'
    },
    {
      name: 'your broke me first',
      iconURL: '../../../../assets/tempolary-images/madonna.jpg',
      artist: 'Madonna',
      podcast: 'Positions'
    }
  ];
  allMix: Mix[] = [
    {
      iconURL: '../../../../assets/tempolary-images/mix-1.jpg',
      style: 'Today’s top'
    },
    {
      iconURL: '../../../../assets/tempolary-images/mix-2.jpg',
      style: 'Rock mix'
    },
    {
      iconURL: '../../../../assets/tempolary-images/mix-3.jpg',
      style: 'Club'
    },
    {
      iconURL: '../../../../assets/tempolary-images/mix-4.jpg',
      style: 'Electro'
    },
    {
      iconURL: '../../../../assets/tempolary-images/mix-5.png',
      style: 'Relax'

    },
    {
      iconURL: '../../../../assets/tempolary-images/mix-6.png',
      style: 'Work'
    }
  ];
  albums = this.allAlbums;
  playlists = this.allPlaylists;

  // TODO: seetings without registration

  constructor(private _authService: AuthService,
    private _albumService: AlbumService) {
=======
  constructor(private _albumService: AlbumService) {
>>>>>>> merge
  }

  async ngOnInit() {
    this._newestAlbums = this.getNewestFiveAlbums();
    this.recentlyPlayed = this.getRecentlyPlayed();
    this.getNewReleases();
    this.calmRhythms = this.getCalmRhythms();
    this.yourMix = this.getYourMix();
    this.top100Songs = this.getTop100Songs();
  }

  public ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  playAlbum = () => {
    // Ability to play album
  };

  saveAlbum = () => {
    // Ability to save album - album is saved in the user playlist
  };

  // User should be able to reach Top 5 of the newest albums
  getNewestFiveAlbums = (): Array<object> => new Array<object>();

  // User should be able to play Recently played - 8 songs/albums/playlists which was played recently
  getRecentlyPlayed = (): Array<object> => new Array<object>();

  // User should be able to play New Releases - songs/albums which was added to system during last month
  public getNewReleases() {
    this._albumService
      .getNewReleases()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (resp: HttpResponse<AlbumView[]>) => {
          this.newReleases = resp.body!;
        }
      );
  }

  // User should be able to play Calm rhythms - the newest playlists which moderator creates
  getCalmRhythms = (): Array<Playlist> => new Array<Playlist>(12).fill(
    {
      id: 0,
      createdAt: new Date(),
      name: 'Fresh & Chill',
      description: 'Ed Sheeran, Paloma Mami Maroon 5, SigalaPink, Oximer, Paloma Mami Maroon 5, SigalaPink, Oximer',
      iconURL: '../../../../../assets/images/playlist1.png',
      author: undefined
    }
  );

  // User should be able to play Your mix - take songs from all playlists plus liked songs and show in random order
  getYourMix = (): Array<object> => new Array<object>();

  // User should be able to play Top 100 songs - 100 song ordering by amount of likes by all users
  getTop100Songs = (): Array<Playlist> => new Array<Playlist>(15).fill(
    {
      id: 0,
      createdAt: new Date(),
      name: 'Fresh & Chill',
      description: 'Ed Sheeran, Paloma Mami Maroon 5, SigalaPink, Oximer',
      iconURL: '../../../../../assets/images/playlist2.png',
      author: undefined
    }
  );

  nextSlide = () => {
    this.accordionAnimation();
    this.currentNewestAlbum = this._newestAlbums[this._newestCounter];
    this._newestCounter += 1;
    if (this._newestCounter > this._newestAlbumsMax - 1) {
      this._newestCounter = 0;
    }
  };

  previousSlide = () => {
    this.accordionAnimation();
    this.currentNewestAlbum = this._newestAlbums[this._newestCounter];
    this._newestCounter -= 1;
    if (this._newestCounter < 0) {
      this._newestCounter = this._newestAlbumsMax - 1;
    }
    this.accordionAnimation();
  };

  accordionAnimation = () => {
    document
      .getElementsByClassName('accordion-information')[0]
      ?.animate([{ opacity: '0' }, { opacity: '1' }], {
        duration: this._animationDuration
      });
  };

  scrollRight = (id: string) => {
    const element = document.getElementById(id);
    let scrollingSize: number = 0;
    if (id === 'album') {
      const move = 239 * 6;
      scrollingSize = move;
    }
    if (id === 'playlist' || id === 'song' || id === 'repeat') {
      const move = 256 * 6;
      scrollingSize = move;
    }
    element?.scrollBy({ left: scrollingSize, behavior: 'smooth' });
  };

  scrollLeft = (id: string) => {
    const element = document.getElementById(id);
    let scrollingSize: number = 0;
    if (id === 'album') {
      const move = 239 * 6;
      scrollingSize = move;
    }
    if (id === 'playlist' || id === 'song' || id === 'repeat') {
      const move = 256 * 6;
      scrollingSize = move;
    }
    element?.scrollBy({ left: -scrollingSize, behavior: 'smooth' });
  };

  scrollRight = (id: string) => {
    const element = document.getElementById(id);
    let scrollingSize: number = 0;
    if (id === 'album') {
      const move = 239 * 6;
      scrollingSize = move;
    }
    if (id === 'playlist' || id === 'song' || id === 'repeat') {
      const move = 260 * 6;
      scrollingSize = move;
    }
    element?.scrollBy({ left: scrollingSize, behavior: 'smooth' });
  };

  scrollLeft = (id: string) => {
    const element = document.getElementById(id);
    let scrollingSize: number = 0;
    if (id === 'album') {
      const move = 239 * 6;
      scrollingSize = move;
    }
    if (id === 'playlist' || id === 'song' || id === 'repeat') {
      const move = 260 * 6;
      scrollingSize = move;
    }
    element?.scrollBy({ left: -scrollingSize, behavior: 'smooth' });
  };
}

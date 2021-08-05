import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist';
import { AuthService } from 'src/app/services/auth.service';
import { Album } from '../../../models/album';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.sass']
})
export class MainHomeComponent implements OnInit {
  private _newestCounter: number = 1;
  private _newestAlbums = new Array<object>(); // Top 5 the newest albums. it's necessary to add  {{...}} to .html

  private readonly _newestAlbumsMax: number = 5;
  private readonly _animationDuration: number = 800;
  private readonly _scrollingSizeAlbums: number = 255;
  private readonly _scrollingSizePlaylists: number = 235;
  private readonly _scrollingSize: number = 270;

  public currentNewestAlbum = this._newestAlbums[0];
  public recentlyPlayed = new Array<object>(); // Only 8 items
  public newReleases = new Array<object>();
  public calmRhythms = new Array<object>();
  public yourMix = new Array<object>();
  public top100Songs = new Array<object>();

  // TODO: tempolary albums and seetings
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
      id: 13,
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
      id: 14,
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
      id: 15,
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
      id: 16,
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
      id: 17,
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
      id: 18,
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
      id: 19,
      titleImage: './../../../../assets/tepolary-images/my-playlists-1.png',
      nameAlbum: 'I last album in group',
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
  playlists = this.allPlaylists;
  cashedAlbums: Album[] = [];
  cashedPlaylists: Playlist[] = [];

  // TODO: seetings without registration
  start: number = 0;
  end: number = 7;
  adjusterAlbums: number = 6;
  adjusterPlaylists: number = 6;

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    this._newestAlbums = this.getNewestFiveAlbums();
    this.recentlyPlayed = this.getRecentlyPlayed();
    this.newReleases = this.getNewReleases();
    this.calmRhythms = this.getCalmRhythms();
    this.yourMix = this.getYourMix();
    this.top100Songs = this.getTop100Songs();
    this.cashedAlbums = this.allAlbums.slice(this.start, this.end);
    this.cashedPlaylists = this.allPlaylists.slice(this.start, this.end);
  }

  nextAlbums(pressingButton: HTMLElement) {
    this.adjusterAlbums += 1;
    pressingButton.scrollBy({ left: this._scrollingSizeAlbums, behavior: 'smooth' });
    if (this.end !== this.allAlbums.length) {
      const index: number = this.end;
      this.end += 1;
      this.cashedAlbums.push(this.allAlbums[index]);
    }
  }

  prevAlbums(pressingButton: HTMLElement) {
    this.adjusterAlbums -= 1;
    pressingButton.scrollBy({ left: -this._scrollingSizeAlbums, behavior: 'smooth' });
  }

  nextPlaylists(pressingButton: HTMLElement) {
    this.adjusterPlaylists += 1;
    pressingButton.scrollBy({ left: this._scrollingSizePlaylists, behavior: 'smooth' });
    if (this.end !== this.allPlaylists.length) {
      const index: number = this.end;
      this.end += 1;
      this.cashedPlaylists.push(this.allPlaylists[index]);
    }
  }

  prevPlaylists(pressingButton: HTMLElement) {
    this.adjusterPlaylists -= 1;
    pressingButton.scrollBy({ left: -this._scrollingSizePlaylists, behavior: 'smooth' });
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
  getNewReleases = (): Array<object> => new Array<object>();

  // User should be able to play Calm rhythms - the newest playlists which moderator creates
  getCalmRhythms = (): Array<object> => new Array<object>();

  // User should be able to play Your mix - take songs from all playlists plus liked songs and show in random order
  getYourMix = (): Array<object> => new Array<object>();

  // User should be able to play Top 100 songs - 100 song ordering by amount of likes by all users
  getTop100Songs = (): Array<object> => new Array<object>();

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

  scroll = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollBy({ left: this._scrollingSize, behavior: 'smooth' });
  };
}

import { Component, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  private readonly _scrollingSize: number = 270;

  public currentNewestAlbum = this._newestAlbums[0];
  public recentlyPlayed = new Array<object>(); // Only 8 items
  public newReleases = new Array<object>();
  public calmRhythms = new Array<Playlist>();
  public yourMix = new Array<object>();
  public top100Songs = new Array<Playlist>();

  constructor(private _authService: AuthService) {
  }

  ngOnInit() {
    this._newestAlbums = this.getNewestFiveAlbums();
    this.recentlyPlayed = this.getRecentlyPlayed();
    this.newReleases = this.getNewReleases();
    this.calmRhythms = this.getCalmRhythms();
    this.yourMix = this.getYourMix();
    this.top100Songs = this.getTop100Songs();
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
  getCalmRhythms = (): Array<Playlist> => new Array<Playlist>(15).fill(
    {
      id: 0,
      createdAt: new Date(),
      name: 'Fresh & Chill',
      description: 'Ed Sheeran, Paloma Mami Maroon 5, SigalaPink, Oximer',
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
    document.getElementsByClassName('accordion-information')[0]?.animate([
      { opacity: '0' },
      { opacity: '1' }
    ], {
      duration: this._animationDuration
    });
  };

  scroll = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollBy({ left: this._scrollingSize, behavior: 'smooth' });
  };
}

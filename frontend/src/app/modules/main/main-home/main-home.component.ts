import { Component, OnDestroy, OnInit } from '@angular/core';
import { Playlist } from 'src/app/models/playlist';
import { HttpResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { AlbumService } from 'src/app/services/album.service';
import { Subject } from 'rxjs';
import { NewReleaseView } from 'src/app/models/album/new-release-view';
import { RecentlyPlayedService } from 'src/app/services/recently-played.service';
import { RecentlyPlayedSong } from 'src/app/models/recently-played/recent-song';
import { AuthService } from 'src/app/services/auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.sass']
})
export class MainHomeComponent implements OnInit, OnDestroy {
  private readonly _rpSongAmount: number = 8;
  private _newestCounter: number = 1;
  private _newestAlbums = new Array<object>(); // Top 5 the newest albums. it's necessary to add  {{...}} to .html

  private readonly _newestAlbumsMax: number = 5;
  private readonly _animationDuration: number = 800;
  private readonly _scrollingSize: number = 1530;

  public currentNewestAlbum = this._newestAlbums[0];
  public recentlyPlayed = new Array<RecentlyPlayedSong>();
  public newReleases: NewReleaseView[] = [];
  public calmRhythms = new Array<Playlist>();
  public yourMix = new Array<object>();
  public top100Songs = new Array<Playlist>();

  private _unsubscribe$ = new Subject<void>();
  private _userId: number;

  constructor(
    private _albumService: AlbumService,
    private _recentlyPlayedService: RecentlyPlayedService,
    private _authService: AuthService
  ) {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => !!state))
      .subscribe((authState) => {
        this._userId = authState!.id;
      });
  }

  async ngOnInit() {
    this.getNewestFiveAlbums();
    this.getRecentlyPlayed();
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

  getNewestFiveAlbums() {
    this._albumService.getFiveNewestAlbums()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this._newestAlbums = data;
        }
      });
  }

  getRecentlyPlayed() {
    this._recentlyPlayedService.getRecentSongs(this._userId, this._rpSongAmount)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this.recentlyPlayed = data;
        }
      });
  }

  // User should be able to play New Releases - songs/albums which was added to system during last month
  public getNewReleases() {
    this._albumService
      .getNewReleases()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (resp: HttpResponse<NewReleaseView[]>) => {
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
    document.getElementsByClassName('accordion-information')[0]?.animate([
      { opacity: '0' },
      { opacity: '1' }
    ], {
      duration: this._animationDuration
    });
  };

  scrollRight = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollBy({ left: this._scrollingSize, behavior: 'smooth' });
  };

  scrollLeft = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollBy({ left: -this._scrollingSize, behavior: 'smooth' });
  };
}

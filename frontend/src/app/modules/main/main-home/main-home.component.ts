import {
  Component, OnDestroy, OnInit
} from '@angular/core';
import { Playlist } from 'src/app/models/playlist';
import { HttpResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { AlbumService } from 'src/app/services/album.service';
import { Subject, timer } from 'rxjs';
import { NewReleaseView } from 'src/app/models/album/new-release-view';
import { RecentlyPlayedService } from 'src/app/services/recently-played.service';
import { RecentlyPlayedSong } from 'src/app/models/recently-played/recent-song';
import { AuthService } from 'src/app/services/auth/auth.service';
import { filter, take } from 'rxjs/operators';
import { NewestFiveAlbum } from 'src/app/models/album/newest-five';
import { ConstructorService } from 'src/app/services/constructor.service';
import { PageSectionFull } from 'src/app/models/constructor/page-section-full';
import { SongsService } from 'src/app/services/songs/songs.service';
import { QueueService } from 'src/app/services/queue.service';
import { Song } from 'src/app/models/song/song';
import { ReactionService } from 'src/app/services/reaction.service';
import { UserService } from 'src/app/services/user.service';
import { ContainerFull } from 'src/app/models/constructor/container-full';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.sass']
})
export class MainHomeComponent implements OnInit, OnDestroy {
  private readonly _rpSongAmount: number = 8;
  private _newestCounter: number = 0;
  private _newestAlbums = new Array<NewestFiveAlbum>(); // Top 5 the newest albums. it's necessary to add  {{...}} to .html

  private readonly _animationDuration: number = 800;
  private readonly _scrollingSize: number = 1530;

  public data: ContainerFull = {} as ContainerFull;
  public accordionSection: PageSectionFull = {} as PageSectionFull;
  public currentAccordionAlbum: NewestFiveAlbum = {} as NewestFiveAlbum;
  public accordionAlbumsLength: number;

  public currentNewestAlbum = {} as NewestFiveAlbum;
  public recentlyPlayed = new Array<RecentlyPlayedSong>();
  public newReleases: NewReleaseView[] = [];
  public calmRhythms = new Array<Playlist>();
  public yourMix = new Array<object>();
  public top100Songs = new Array<Playlist>();

  isSuccess: boolean = false;
  idSaveButtonShown: boolean = true;
  showNewReleases: boolean;

  private _unsubscribe$ = new Subject<void>();
  private _userId: number;

  constructor(
    private _albumService: AlbumService,
    private _recentlyPlayedService: RecentlyPlayedService,
    private _authService: AuthService,
    private _constructorService: ConstructorService,
    private _songsService: SongsService,
    private _queueService: QueueService,
    private _reactionService: ReactionService,
    private _userService: UserService
  ) {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => !!state))
      .subscribe((authState) => {
        this._userId = authState!.id;
      });
  }

  async ngOnInit() {
    this._userService.getUserSettings().pipe(takeUntil(this._unsubscribe$)).subscribe(
      (resp) => {
        this.showNewReleases = resp.body?.showNewReleases!;
      }
    );
    this._constructorService.getPublishedContainer()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (resp: HttpResponse<ContainerFull>) => {
          this.data = resp.body!;
          this.getAccordionAlbums();
        }
      );

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

  playAlbum = (id: number) => {
    this._songsService.getSongsByAlbumId(id)
      .pipe(take(1))
      .subscribe((result) => {
        this.updateQueue(result);
      });
  };

  updateQueue(songs: Song[]) {
    if (!songs.length) {
      return;
    }

    this._queueService.clearQueue();
    this._queueService.addSongsToQueue(songs);

    const [first] = songs;

    this._queueService.initSong(first, true);
  }

  saveAlbum = (id: number) => {
    this._reactionService.addAlbumReaction(id, this._userId)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.idSaveButtonShown = !this.idSaveButtonShown;
          this.isSuccess = true;
          this._newestAlbums.find((a) => a.id === id)!.isLiked = true;

          timer(3000).pipe(take(1)).subscribe((val) => {
            this.isSuccess = Boolean(val);
          });
        }
      });
  };

  getAccordionAlbums() {
    this.accordionSection = this.data.pageSections.find((ps) => ps.position === 1)!;
    this.currentAccordionAlbum = this.accordionSection.pageSectionEntities[0]?.entity;
    this.accordionAlbumsLength = [...this.accordionSection.pageSectionEntities].length;
  }

  getNewestFiveAlbums() {
    this._albumService.getFiveNewestAlbums()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this._newestAlbums = data;
          this.currentNewestAlbum = {
            ...this._newestAlbums[0]
          };
          this.setButtonVisibility();
        }
      });
  }

  setButtonVisibility() {
    this.idSaveButtonShown = this.currentAccordionAlbum.artistId !== this._userId
                          && !this.currentAccordionAlbum.isLiked;
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
    this._newestCounter += 1;
    if (this._newestCounter > this.accordionAlbumsLength - 1) {
      this._newestCounter = 0;
    }
    this.currentAccordionAlbum = this.accordionSection.pageSectionEntities[this._newestCounter].entity;
    this.setButtonVisibility();
    this.accordionAnimation();
  };

  previousSlide = () => {
    this.accordionAnimation();
    this._newestCounter -= 1;
    if (this._newestCounter < 0) {
      this._newestCounter = this.accordionAlbumsLength - 1;
    }
    this.currentAccordionAlbum = this.accordionSection.pageSectionEntities[this._newestCounter].entity;
    this.setButtonVisibility();
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

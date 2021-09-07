import {
  Component, ElementRef, OnInit, ViewChild, OnDestroy
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { AlbumFull } from 'src/app/models/album/album-full';
import { AlbumService } from 'src/app/services/album.service';
import { ClipboardService } from 'ngx-clipboard';
import { ReactionService } from 'src/app/services/reaction.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { filter, takeUntil } from 'rxjs/operators';
import { QueueService } from 'src/app/services/queue.service';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { Subject, timer } from 'rxjs';
import { SongsService } from 'src/app/services/songs/songs.service';
import { Song } from 'src/app/models/song/song';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.sass']
})
export class AlbumDetailsComponent implements OnInit, OnDestroy {
  private _userId: number;
  private readonly _scrollingSize: number = 270;
  private readonly _decimalRadix = 10;
  private readonly _gridScrollMultiplier = 3;
  private _unsubscribe$ = new Subject<void>();

  @ViewChild('albums') albumsElement: ElementRef;
  album: AlbumFull = {} as AlbumFull;
  isSuccess: boolean = false;
  anotherAlbums: AlbumForReadDTO[] = [];
  isAuthor: boolean;

  constructor(
    private _clipboardApi: ClipboardService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _service: AlbumService,
    private _reactionService: ReactionService,
    private _location: PlatformLocation,
    private _authService: AuthService,
    private _queueService: QueueService,
    private _songsService: SongsService
  ) {
    this.getUserId();
  }

  ngOnInit() {
    this._route.params.subscribe(() => {
      this.loadData();
      window.scroll(0, 0);
    });
  }

  public ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  getUserId() {
    this._authService.getAuthStateObservableFirst()
      .pipe(filter((state) => !!state))
      .subscribe(
        (state) => {
          this._userId = state!.id;
        }
      );
  }

  loadData() {
    const albumId = this._route.snapshot.params.id;

    this._service.getAlbumWithSongs(albumId)
      .subscribe(
        (result) => {
          this.album = result;
          this.isAuthor = this._userId === (this.album?.artist?.id ?? this.album?.group?.id);

          this.loadAnotherAlbums();
        }
      );
  }

  loadAnotherAlbums() {
    const artistId = this.album?.artist?.id ?? this.album?.group?.id;

    this._service.getAlbumsByArtist(artistId as number, this.album.authorType)
      .subscribe(
        (result) => {
          this.anotherAlbums = result;

          const index = this.anotherAlbums.findIndex((a) => a.id === this.album.id);
          this.anotherAlbums.splice(index, 1);
        }
      );
  }

  likeAlbum() {
    this._reactionService.addAlbumReaction(this.album.id, this._userId)
      .subscribe(
        () => {
          this.album.isLiked = true;
        }
      );
  }

  dislikeAlbum() {
    this._reactionService.removeAlbumReaction(this.album.id, this._userId)
      .subscribe(
        () => {
          this.album.isLiked = false;
        }
      );
  }

  removeAlbum() {
    this._service.removeAlbum(this.album.id)
      .subscribe(
        () => {
          this._router.navigateByUrl('/perflowstudio/albums');
        }
      );
  }

  scroll() {
    this.albumsElement.nativeElement?.scrollBy({ left: this._scrollingSize, behavior: 'smooth' });
  }

  copyLink() {
    this._clipboardApi.copyFromContent(this._location.href);
    this.isSuccess = true;
    timer(3000).subscribe((val) => {
      this.isSuccess = Boolean(val);
    });
  }

  playAlbum = () => {
    if (!this.album.songs.length) {
      return;
    }

    this._queueService.clearQueue();
    this._queueService.addSongsToQueue(this.album.songs);

    const [first] = this.album.songs;

    this._queueService.initSong(first, true);
  };

  addToQueue = () => {
    if (!this.album.songs.length) {
      return;
    }

    this._queueService.addSongsToQueue(this.album.songs);

    if (!QueueService.isInitialized) {
      const [first] = this.album.songs;
      this._queueService.initSong(first);
    }
  };

  getGridScrollWidth = (selector: string) => {
    const element = document.querySelector(selector);
    const style = getComputedStyle(element!);
    const gapWidth = parseInt(style.gridGap.split(' ')[0], this._decimalRadix);
    const elementWidth = parseInt(style.gridTemplateColumns.split(' ')[0], this._decimalRadix);

    return gapWidth + elementWidth;
  };

  scrollGridRight = (id: string, selector: string) => {
    const grid = document.getElementById(id);

    grid?.scrollBy({ left: this.getGridScrollWidth(selector) * this._gridScrollMultiplier, behavior: 'smooth' });
  };

  scrollGridLeft = (id: string, selector: string) => {
    const grid = document.getElementById(id);

    grid?.scrollBy({ left: -(this.getGridScrollWidth(selector) * this._gridScrollMultiplier), behavior: 'smooth' });
  };

  clickMenuHandler(data: { menuItem: string, song: Song }) {
    switch (data.menuItem) {
      case 'Remove from album':
        this.deleteSongFromAlbum(data.song);
        break;
      default:
        break;
    }
  }

  deleteSongFromAlbum = (song: Song) => {
    if (this.album.songs.find((s) => s.id === song.id)) {
      this._songsService.deleteSong(song.id)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe({
          next: () => {
            this.album.songs = this.album.songs.filter((s) => s.id !== song.id);
          }
        });
    }
  };
}

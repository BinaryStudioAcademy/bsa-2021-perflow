import { PlatformLocation } from '@angular/common';
import {
  Component, OnInit, OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { Subject, timer } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { AuthorType } from 'src/app/models/enums/author-type.enum';
import { AccessType } from 'src/app/models/playlist/accessType';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { Song } from 'src/app/models/song/song';
import { ArtistFull } from 'src/app/models/user/artist-full';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { QueueService } from 'src/app/services/queue.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.sass']
})
export class ArtistDetailsComponent implements OnInit, OnDestroy {
  private _userId: number;
  private readonly _decimalRadix = 10;
  private readonly _gridScrollMultiplier = 3;
  private _unsubscribe$ = new Subject<void>();

  artist: ArtistFull = {} as ArtistFull;
  topSongs: Song[] = [];
  artistPlaylists: PlaylistView[] = [];
  isSuccess: boolean = false;
  artistAlbums: AlbumForReadDTO[] = [];
  artistSingles: AlbumForReadDTO[] = [];
  isArtist: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _artistService: ArtistService,
    private _songService: SongsService,
    private _playlistsService: PlaylistsService,
    private _queueService: QueueService,
    private _clipboardApi: ClipboardService,
    private _location: PlatformLocation,
    private _reactionService: ReactionService,
    private _authService: AuthService,
    private _albumsService: AlbumService,
    private _snackbarService: SnackbarService
  ) {
    _route.params
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        this.loadData();
      });
  }

  ngOnInit() {
    this.loadData();
    this.getUserId();
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  getUserId() {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => !!state))
      .subscribe(
        (state) => {
          this._userId = state!.id;
        }
      );
  }

  loadData() {
    const artistId = this._route.snapshot.params.id;

    this._artistService.getArtist(artistId)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (result) => {
          this.artist = result;
          this.isArtist = this._userId === this.artist.id;

          this.loadTopSongs();
          this.loadPlaylists();
          this.loadAlbums();
        }
      );
  }

  loadTopSongs() {
    this._songService.getTopSongsByAuthorId(this.artist.id, 10, AuthorType.artist)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (result) => {
          this.topSongs = result;
        }
      );
  }

  loadPlaylists() {
    this._playlistsService.getPlaylistsByAuthorId(this.artist.id)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (result) => {
          this.artistPlaylists = result.filter((p) => p.accessType !== AccessType.secret);
        }
      );
  }

  likeArtist() {
    if (this.artist.isLiked){
      this._snackbarService.show({ message: `You already subscribed to ${this.artist.userName}.` });
      return;
    }
    this._reactionService.addArtistReaction(this.artist.id, this._userId)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        () => {
          this.artist.isLiked = true;

          this._snackbarService.show({ message: `You have subscribed to ${this.artist.userName}.` });
        }
      );
  }

  dislikeArtist() {
    this._reactionService.removeArtistReaction(this.artist.id, this._userId)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        () => {
          this.artist.isLiked = false;

          this._snackbarService.show({ message: `You have unsubscribed from the ${this.artist.userName}.` });
        }
      );
  }

  loadAlbums() {
    this._albumsService.getAlbumsByArtist(this.artist.id, AuthorType.artist)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (result) => {
          this.artistAlbums = result.filter(a => !a.isSingle);
          this.artistSingles = result.filter(a => a.isSingle);
        }
      );
  }

  playArtist = () => {
    if (!this.topSongs.length) {
      return;
    }

    this._queueService.clearQueue();
    this._queueService.addSongsToQueue(this.topSongs);

    const [first] = this.topSongs;

    this._queueService.initSong(first, true);
  };

  addToQueue = () => {
    if (!this.topSongs.length) {
      return;
    }

    this._queueService.addSongsToQueue(this.topSongs);
  };

  copyLink() {
    this._clipboardApi.copyFromContent(this._location.href);
    this.isSuccess = true;
    timer(3000).subscribe((val) => {
      this.isSuccess = Boolean(val);
    });
  }

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
}

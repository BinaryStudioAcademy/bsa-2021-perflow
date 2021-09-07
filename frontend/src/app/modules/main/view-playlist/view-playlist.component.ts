import { Playlist } from 'src/app/models/playlist/playlist';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Song } from 'src/app/models/song/song';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { filter, take, takeUntil } from 'rxjs/operators';
import { QueueService } from 'src/app/services/queue.service';
import { ClipboardService } from 'ngx-clipboard';
import { SharePlayService } from 'src/app/services/share-play.service';
import { PlatformLocation } from '@angular/common';
import { Subject, timer } from 'rxjs';
import { AccessType } from 'src/app/models/playlist/accessType';
import { PlaylistEditorsService } from 'src/app/services/playlists/playlist-editors.service';
import { PlaylistType } from 'src/app/models/enums/playlist-type';
import { HubConnectionState } from '@microsoft/signalr';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { CreatePlaylistService } from '../../shared/playlist/create-playlist/create-playlist.service';

@Component({
  selector: 'app-view-playlist',
  templateUrl: './view-playlist.component.html',
  styleUrls: ['./view-playlist.component.sass']
})
export class ViewPlaylistComponent implements OnInit {
  public songs: Song[] = [];
  public userId: number;
  public totalCountSongs: number;
  public hours: number;
  public minutes: number;
  public playlist: Playlist = {} as Playlist;
  private _totalTimeSongs: number;
  private _playlistId: number;
  private _unsubscribe$ = new Subject<void>();
  public isSuccess: boolean = false;
  isAuthor: boolean;
  isCollaborative: boolean;
  isGroupNotified: boolean = false;
  isConnected: boolean = false;
  readonly playlistType = PlaylistType;
  readonly playlistAccessType = AccessType;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _playlistsService: PlaylistsService,
    private _router: Router,
    private _reactionService: ReactionService,
    private _authService: AuthService,
    private _queueService: QueueService,
    private _createdPlaylistService: CreatePlaylistService,
    private _clipboardApi: ClipboardService,
    private _location: PlatformLocation,
    private _playlistService: PlaylistsService,
    private _playlistEditorsService: PlaylistEditorsService,
    private _sharePlayService: SharePlayService,
    private _snackBarService: SnackbarService
  ) {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => !!state))
      .subscribe(
        (state) => {
          this.userId = state!.id;
        }
      );
  }

  ngOnInit() {
    this._activateRoute.params.subscribe((params: Params) => {
      this._playlistId = params.id;
      this.loadPlaylist();
      this.loadPlaylistSongs();
    });

    this._createdPlaylistService.playlistEditName$
      .subscribe({
        next: (data) => {
          if (this.playlist.id === data.id) {
            this.playlist = {
              ...this.playlist,
              ...data
            };
          }
        }
      });

    this.isConnected = this._sharePlayService.getHubStatus() === HubConnectionState.Connected;
  }

  nextSlide = () => { };

  previousSlide = () => { };

  play = () => {
    if (this.songs.length === 0) return;

    this._queueService.clearQueue();
    this._queueService.addSongsToQueue(this.songs);

    this._queueService.initSong(this.songs[0], true);
  };

  loadPlaylistSongs() {
    this._playlistsService
      .getPlaylistSongs(this._playlistId)
      .subscribe((songs) => {
        this.songs = songs;
        this.totalCountSongs = songs.length;
        this._totalTimeSongs = songs
          .filter((s) => s.duration > 0)
          .reduce((sum, current) => sum + current.duration, 0);
        const hour = 3600;
        const minute = 60;
        this.hours = Math.floor(this._totalTimeSongs / hour);
        this.minutes = Math.floor(((this._totalTimeSongs % hour) / minute));
      });
  }

  loadPlaylist() {
    this._playlistsService
      .getPlaylist(this._playlistId)
      .pipe(take(1))
      .subscribe({
        next: (playlist) => {
          this.playlist = playlist;
          this.isAuthor = this.userId === this.playlist.author.id;
          this._playlistEditorsService.getCollaborators(playlist.id)
            .pipe(take(1))
            .subscribe(
              (result) => {
                this.isCollaborative = result.find((u) => u.id === this.userId) !== undefined;
              }
            );
          this.getSharePlayState(playlist.id);
        },
        error: () => {
          this._router.navigateByUrl('/playlists/all');
        }
      });
  }

  dislikePlaylist(playlistId: number) {
    this._reactionService.removePlaylistReaction(playlistId, this.userId)
      .subscribe(
        () => {
          this.playlist.isLiked = false;
        }
      );
  }

  likePlaylist(playlistId: number) {
    this._reactionService.addPlaylistReaction(playlistId, this.userId)
      .subscribe(
        () => {
          this.playlist.isLiked = true;
        }
      );
  }

  addToQueue = () => {
    if (!this.songs.length) {
      return;
    }

    this._queueService.addSongsToQueue(this.songs);

    if (!QueueService.isInitialized) {
      const [first] = this.songs;
      this._queueService.initSong(first);
    }
  };

  deletePlaylist() {
    this._playlistsService.deletePlaylist(this.playlist.id)
      .subscribe({
        next: (data) => {
          this._createdPlaylistService.deletePlaylist(data);
          this._router.navigateByUrl('/playlists/all');
        }
      });
  }

  copyLink() {
    this._clipboardApi.copyFromContent(this._location.href);
    this.isSuccess = true;
    timer(3000).subscribe((val) => {
      this.isSuccess = Boolean(val);
    });
  }

  clickMenuHandler(data: { menuItem: string, song: Song }) {
    switch (data.menuItem) {
      case 'Remove from playlist':
        this.deleteSongFromPlaylist(data.song);
        break;
      default:
        break;
    }
  }

  deleteSongFromPlaylist(song: Song) {
    if (this.songs.find((s) => s.id === song.id)) {
      const playlistSong = { playlistId: this.playlist.id, songId: song.id };
      this._playlistService.deleteSongToPlaylist(playlistSong)
        .pipe(take(1))
        .subscribe({
          next: (data) => {
            this.songs = this.songs.filter((s) => s.id !== data.songId);
          }
        });
    }
  }

  canShare = (accessType: AccessType) => accessType !== AccessType.secret;

  sharePlay(pl: Playlist) {
    this._sharePlayService.sharePlayAsync({ masterId: 0, playlistId: pl.id })
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: () => {
          this.connectToSharePlay(pl.id);
          this.isGroupNotified = true;
        },
        error: () => {
          this._snackBarService.show({ message: 'Connection is closed! Try reload the page' });
        }
      });
  }

  getSharePlayState(id: number) {
    this._sharePlayService.getSharePlayState(id)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this.isGroupNotified = data;
        }
      });
  }

  connectToSharePlay(playlistId: number) {
    this._sharePlayService.connectToSharePlay(playlistId)
      .then(() => {
        this.isConnected = true;
      })
      .then(() => {
        if (!this.songs.length) {
          return;
        }

        this._queueService.clearQueue();
        this._queueService.addSongsToQueue(this.songs);
        this._queueService.initSong(this.songs[0], false);
      });
  }

  disconnectSharePlay(playlistId: number) {
    this._sharePlayService.disconectHub()
      .then(() => {
        this.isConnected = false;
        this.isGroupNotified = false;
      });
  }
}

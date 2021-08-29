import { PlatformLocation } from '@angular/common';
import {
  Component, Input, Output, EventEmitter, OnInit, OnDestroy
} from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { Subject, timer } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { PlaylistName } from 'src/app/models/playlist/playlist-name';
import { PlaylistSongDTO } from 'src/app/models/playlist/playlistSongDTO';
import { Song } from 'src/app/models/song/song';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { QueueService } from 'src/app/services/queue.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { SongsService } from 'src/app/services/songs/songs.service';
import { CreatePlaylistService } from '../playlist/create-playlist/create-playlist.service';

@Component({
  selector: 'app-song-row',
  templateUrl: './song-row.component.html',
  styleUrls: ['./song-row.component.sass']
})

export class SongRowComponent implements OnInit, OnDestroy {
  private _userId: number;
  private _unsubscribe$ = new Subject<void>();

  isEditing = false;
  isSuccess: boolean = false;
  createdPlaylistArray = new Array<PlaylistName>();

  @Input() song: Song;
  @Input() number: number;
  @Input() highlightId: number;
  @Input() isInQueue = false;
  @Input() isEditable = false;
  @Input() isPlaying = false;

  @Output() clickMenuItem = new EventEmitter<{ menuItem: string, song: Song }>();
  @Output() clickDislike = new EventEmitter<number>();
  @Output() togglePlayEvent = new EventEmitter<void>();

  constructor(
    private _reactionService: ReactionService,
    private _authService: AuthService,
    private _queueService: QueueService,
    private _clipboardApi: ClipboardService,
    private _location: PlatformLocation,
    private _songService: SongsService,
    private _createPlaylistService: CreatePlaylistService,
    private _playlistsService: PlaylistsService
  ) { }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.getUserId();

    this._createPlaylistService.getChachedPlaylists()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this.createdPlaylistArray = data;
        }
      });

    this.subscribeToCreatePlaylistService();
  }

  subscribeToCreatePlaylistService() {
    this._createPlaylistService.playlistChanged$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((playlist) => {
        const playlistIndex = this.createdPlaylistArray.findIndex((pl) => pl.id === playlist?.id);

        if (playlistIndex === -1) {
          this.createdPlaylistArray.push({ id: playlist!.id, name: playlist!.name });
        }
        else {
          this.createdPlaylistArray[playlistIndex] = { id: playlist!.id, name: playlist!.name };
        }
      });

    this._createPlaylistService.playlistDeleted$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((id) => {
        this.createdPlaylistArray = this.createdPlaylistArray.filter((pl) => pl.id !== id);
      });

    this._createPlaylistService.playlistEditName$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((playlist) => {
        this.createdPlaylistArray.find((pl) => pl.id === playlist.id)!.name = playlist.name;
      });
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

  saveToPlaylist(pId: number, sId: number) {
    const playlistSong = {
      playlistId: pId,
      songId: sId
    } as PlaylistSongDTO;

    this._playlistsService.addSongToPlaylist(playlistSong)
      .pipe(take(1)).subscribe();
  }

  clickItem(menu: string) {
    this.clickMenuItem.emit({ menuItem: menu, song: this.song });

    if (menu === 'Add to queue') this._queueService.addSongToQueue(this.song);
  }

  copyLink() {
    this._clipboardApi.copyFromContent(
      `${this._location.hostname}:${this._location.port}/albums/${this.song.album.id}`
    );
    this.isSuccess = true;
    timer(3000).subscribe((val) => {
      this.isSuccess = Boolean(val);
    });
  }

  dislikeSong(songId: number) {
    this.clickDislike.emit(songId);

    this._reactionService.removeLike(songId, this._userId)
      .subscribe(
        () => {
          this.song.isLiked = false;
        }
      );
  }

  likeSong(songId: number) {
    this._reactionService.likeSong(songId, this._userId)
      .subscribe(
        () => {
          this.song.isLiked = true;
        }
      );
  }

  playSong = () => {
    if (!this.highlightId) {
      this._queueService.addSongToQueue(this.song);
    }

    if (this.highlightId !== this.song.id) {
      this._queueService.initSong(this.song, true);
    }
    else {
      this.togglePlayEvent.emit();
    }
  };

  pauseSong = () => {
    this.togglePlayEvent.emit();
  };

  editName = () => {
    this.isEditing = true;
  };

  saveName = () => {
    const subscription = this._songService.updateSongInfo(this.song).subscribe(() => {
      this.isEditing = false;
      subscription.unsubscribe();
    });
  };

  changeCensorship = () => {
    this.song.hasCensorship = !this.song.hasCensorship;
    const subscription = this._songService.updateSongInfo(this.song).subscribe(() => {
      subscription.unsubscribe();
    });
  };
}

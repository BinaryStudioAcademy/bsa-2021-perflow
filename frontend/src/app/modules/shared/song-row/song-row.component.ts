import { PlatformLocation } from '@angular/common';
import {
  Component, Input, Output, EventEmitter, OnInit, OnDestroy
} from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { PlaylistName } from 'src/app/models/playlist/playlist-name';
import { PlaylistSongDTO } from 'src/app/models/playlist/playlistSongDTO';
import { Playlist } from 'src/app/models/playlist/playlist';
import { AlbumFull } from 'src/app/models/album/album-full';
import { Song } from 'src/app/models/song/song';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { QueueService } from 'src/app/services/queue.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { SongsService } from 'src/app/services/songs/songs.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SnackbarInfo } from 'src/app/models/common/snackbar-info';
import { Tag } from 'src/app/models/tag/tag';
import { RadioService } from 'src/app/services/radio.service';
import { SongToolbarService } from 'src/app/services/song-toolbar.service';
import { CreatePlaylistService } from '../playlist/create-playlist/create-playlist.service';

@Component({
  selector: 'app-song-row',
  templateUrl: './song-row.component.html',
  styleUrls: ['./song-row.component.sass']
})

export class SongRowComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  userId: number;
  isEditing = false;
  createdPlaylistArray = new Array<PlaylistName>();
  notification: string;
  songTags: Tag[];

  @Input() song: Song;
  @Input() tags: Tag[];
  @Input() number: number;
  @Input() highlightId: number;
  @Input() isInQueue = false;
  @Input() isEditable = false;
  @Input() isPlaying = false;
  @Input() playlist: Playlist | undefined;
  @Input() album: AlbumFull | undefined;
  @Input() isRemoveFromQueueShonw: boolean = false;
  @Input() isRemoveFromPlaylistShown: boolean = true;
  @Input() isGroupMember: boolean = false;

  @Output() clickMenuItem = new EventEmitter<{ menuItem: string, song: Song }>();
  @Output() clickDislike = new EventEmitter<number>();
  @Output() togglePlayEvent = new EventEmitter<void>();
  @Output() changeIsPlaylingEvent = new EventEmitter<Song>();

  constructor(
    private _reactionService: ReactionService,
    private _authService: AuthService,
    private _queueService: QueueService,
    private _clipboardApi: ClipboardService,
    private _location: PlatformLocation,
    private _songService: SongsService,
    private _createPlaylistService: CreatePlaylistService,
    private _playlistsService: PlaylistsService,
    private _snackbarService: SnackbarService,
    private _radioService: RadioService,
    private _songToolbarService: SongToolbarService
  ) { }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.getUserId();
    this.subscribeToCreatePlaylistService();
  }

  subscribeToCreatePlaylistService() {
    this._createPlaylistService.getChachedPlaylists()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this.createdPlaylistArray = data;
        }
      });

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
      .pipe(take(1))
      .subscribe(
        (state) => {
          this.userId = state!.id;
        }
      );
  }

  saveToPlaylist(playlist: PlaylistName, sId: number) {
    const playlistSong = {
      playlistId: playlist.id,
      songId: sId
    } as PlaylistSongDTO;

    this._playlistsService.checkSongInPlaylist({ playlistId: playlist.id, songId: sId })
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          if (data) {
            this.showNotification('There is the song in the playlist');
          }
          else {
            this._playlistsService.addSongToPlaylist(playlistSong)
              .pipe(take(1))
              .subscribe(() => {
                this.showNotification(`Song added to playlist ${playlist.name}`);
              });
          }
        }
      });
  }

  clickItem(menu: string) {
    this.clickMenuItem.emit({ menuItem: menu, song: this.song });

    if (menu === 'Add to queue') {
      this._queueService.addSongToQueue(this.song);
      this._snackbarService.show({
        message: 'The song was added to queue', duration: 1500
      } as SnackbarInfo);
    }
  }

  copyLink() {
    this._clipboardApi.copyFromContent(
      `${this._location.hostname}:${this._location.port}/albums/${this.song.album.id}`
    );

    this.showNotification('Link copied to clipboard!');
  }

  showNotification(text: string) {
    this.notification = text;

    this._snackbarService.show({ message: this.notification });
  }

  dislikeSong(songId: number) {
    this.clickDislike.emit(songId);

    this._reactionService.removeLike(songId, this.userId)
      .subscribe(
        () => {
          this.song.isLiked = false;
        }
      );
  }

  likeSong(songId: number) {
    this._reactionService.likeSong(songId, this.userId)
      .subscribe(
        () => {
          this.song.isLiked = true;
        }
      );
  }

  addTag() {
    $(`.edit.${this.song.id.toString()}`).modal('show');
  }

  updateTags(tags: Tag[]) {
    this.song.tags = tags;
  }

  startRadio() {
    this._radioService.getRadioBySongId(this.song.id)
      .pipe(take(1))
      .subscribe((songs) => {
        if (songs.length > 0) {
          this.updateQueue(songs);
          this.showNotification('Radio started');
        }
      });
  }

  updateQueue(songs: Song[]) {
    if (!songs.length) {
      return;
    }

    this._queueService.clearQueue();
    this._queueService.addSongsToQueue(songs);

    const [first] = songs;

    this._queueService.initSong(first, true);
  }

  playSong = () => {
    this.changeIsPlaylingEvent.emit(this.song);
    if (!this.highlightId) {
      this._queueService.addSongToQueue(this.song);
    }

    if (this.highlightId !== this.song.id) {
      this._queueService.initSong(this.song, true);
    }
    else {
      // this._songToolbarService.togglePlay();
      this.togglePlayEvent.emit();
    }
  };

  pauseSong = () => {
    this._songToolbarService.togglePlay();
    // this.togglePlayEvent.emit();
    this.changeIsPlaylingEvent.emit(this.song);
  };

  editName = () => {
    this.isEditing = true;
  };

  saveName() {
    this._songService.setSongName(this.song.id, this.song.name)
      .pipe(take(1))
      .subscribe(() => {
        this.isEditing = false;
      });
  }

  changeCensorship() {
    this.song.hasCensorship = !this.song.hasCensorship;
    this._songService.setSongCensorship(this.song.id, this.song.hasCensorship)
      .pipe(take(1))
      .subscribe(() => {
        this.isEditing = false;
      });
  }
}

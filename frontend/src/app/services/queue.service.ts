import { EventEmitter, Injectable } from '@angular/core';
import { from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Song } from '../models/song/song';
import { SongInfo } from '../models/song/song-info';
import { HttpInternalService } from './http-internal.service';
import { SongToolbarService } from './song-toolbar.service';
import { SongsService } from './songs/songs.service';

@Injectable({
  providedIn: 'root'
})

export class QueueService {
  private _songAdd = new Subject<Song>();
  private _nextSong = new Subject<void>();
  private _previousSong = new Subject<void>();
  private _clearQueue = new Subject<void>();
  private _unsubscribe$ = new Subject<void>();

  songAdded$ = this._songAdd.asObservable();
  nextSong$ = this._nextSong.asObservable();
  previousSong$ = this._previousSong.asObservable();
  queueCleared$ = this._clearQueue.asObservable();

  nextSongGot = new EventEmitter<Song | null>();
  previousSongGot = new EventEmitter<Song | null>();
  currentSongUpdate = new EventEmitter<Song>();
  playingToggled = new EventEmitter<boolean>();
  shuffleToggled = new EventEmitter<boolean>();

  static isInitialized = false;

  constructor(
    private _songService: SongsService,
    private _toolbarService: SongToolbarService,
    private _httpService: HttpInternalService
  ) {
    this.nextSongGot.subscribe((song) => {
      if (song) {
        this.initSong(song, true);
      }
    });

    this.previousSongGot.subscribe((song) => {
      if (song) {
        this.initSong(song, true);
      }
    });
  }

  addSongToQueue = (song: Song) => {
    this._songAdd.next(song);
  };

  addSongsToQueue = (songs: Song[]) => {
    from(songs)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (song) => {
          this._songAdd.next(song);
        }
      );
  };

  nextSong = () => {
    this._nextSong.next();
  };

  previousSong = () => {
    this._previousSong.next();
  };

  initSong = (songForInit: Song, play: boolean = false) => {
    this._songService.getSongById(songForInit.id).subscribe((song) => {
      const songForPlay = new SongInfo(
        song.id,
        song.name,
        (song?.artist?.userName ?? song?.group?.name)!,
        this._httpService.buildUrl(`/api/Songs/file?blobId=${song.blobId}`),
        song.album.iconURL
      );
      this._toolbarService.updateSong(songForPlay);

      QueueService.isInitialized = true;

      if (play) this._toolbarService.togglePlay();

      this.currentSongUpdate.emit(song);
    });
  };

  setPlaying = (value: boolean) => {
    this.playingToggled.emit(value);
  };

  setShuffle = (value: boolean) => {
    this.shuffleToggled.emit(value);
  };

  clearQueue = () => {
    this._clearQueue.next();
  };
}

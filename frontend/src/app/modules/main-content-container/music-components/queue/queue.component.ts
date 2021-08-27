import {
  Component, EventEmitter, Input, OnDestroy, Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Song } from 'src/app/models/song/song';
import { QueueService } from 'src/app/services/queue.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.sass']
})
export class QueueComponent implements OnDestroy {
  private _unsubscribe$ = new Subject<void>();

  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();
  @Output() togglePlayEvent = new EventEmitter<void>();
  @Output() reseted = new EventEmitter<void>();

  isOpened = false;
  isPlaying = false;
  isShuffling = false;
  filterExplicit = false;

  @Input() songs: Song[] = [];

  currentSongId: number;
  unshuffledSongs: Song[] = [];

  constructor(
    private _queueService: QueueService,
    private _userService: UserService
  ) {
    _queueService.songAdded$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((song) => {
        if (!this.songs.length) {
          this.currentSongId = song.id;
        }

        if (!this.songs.find((s) => s.id === song.id)) {
          this.songs.push(song);
          this.unshuffledSongs.push(song);
          this.shuffleSongs();
        }
      });

    _queueService.nextSong$.subscribe(() => {
      _queueService.nextSongGot.emit(this.getNextSong());
    });

    _queueService.previousSong$.subscribe(() => {
      _queueService.previousSongGot.emit(this.getPreviousSong());
    });

    _queueService.currentSongUpdate
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((song) => {
        this.currentSongId = song.id;
      });

    _queueService.playingToggled
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((value) => {
        this.isPlaying = value;
      });

    _queueService.shuffleToggled
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((value) => {
        if (value) {
          this.shuffleSongs();
        }
        this.isShuffling = value;
      });

    _queueService.queueCleared$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        this.songs = [];
        this.unshuffledSongs = [];
      });
  }

  public ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  openView = () => {
    this.isOpened = true;
    this._userService.getUserSettings()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (resp) => {
          this.filterExplicit = resp.body?.showExplicitContent!;
          if (!this.filterExplicit) {
            this.songs = this.songs?.filter((s) => !s.hasCensorship);
            this.unshuffledSongs = this.unshuffledSongs?.filter((s) => !s.hasCensorship);
          }
        }
      );
    this.opened.emit();
  };

  closeView = () => {
    this.isOpened = false;
    this.closed.emit();
  };

  clickMenuHandler(data: { menuItem: string, song: Song }) {
    switch (data.menuItem) {
      case 'Add to queue': {
        if (!this.songs.find((s) => s.id === data.song.id)) {
          this.songs = [...this.songs, data.song];
        }
        break;
      }
      case 'Remove from queue': {
        const removingSong = this.songs.find((s) => s.id === data.song.id);
        const removingSong1 = this.unshuffledSongs.find((s) => s.id === data.song.id);

        if (!removingSong || !removingSong1) {
          break;
        }

        if (this.songs.length === 1 || this.unshuffledSongs.length === 1) {
          this.resetQueue();
        }

        if (this.currentSongId === removingSong.id || this.currentSongId === removingSong1.id) {
          this.switchToNearestAccessible();
        }

        this.removeSong(removingSong, removingSong1);
        break;
      }
      default:
        break;
    }
  }

  switchToNearestAccessible = () => {
    if (this.getCurrentSongIndex() + 1 === this.songs.length) {
      this._queueService.previousSong();
    }
    else {
      this._queueService.nextSong();
    }
  };

  removeSong = (song: Song, song1: Song) => {
    const indexForDelete = this.songs.indexOf(song);
    const indexForDelete1 = this.unshuffledSongs.indexOf(song1);
    this.songs.splice(indexForDelete, 1);
    this.unshuffledSongs.splice(indexForDelete1, 1);
  };

  togglePlay = () => {
    this.togglePlayEvent.emit();
  };

  getNextSong = () => {
    const index = this.getCurrentSongIndex();
    if (this.isShuffling) {
      if (!this.songs.length || index + 1 >= this.songs.length) return null;

      this.currentSongId = this.songs[index + 1].id;

      return this.songs[index + 1];
    }

    if (!this.unshuffledSongs.length || index + 1 >= this.unshuffledSongs.length) return null;

    this.currentSongId = this.unshuffledSongs[index + 1].id;

    return this.unshuffledSongs[index + 1];
  };

  getPreviousSong = () => {
    const index = this.getCurrentSongIndex();
    if (this.isShuffling) {
      if (!this.songs.length || index - 1 < 0) return null;

      this.currentSongId = this.songs[index - 1].id;

      return this.songs[index - 1];
    }

    if (!this.unshuffledSongs.length || index - 1 < 0) return null;

    this.currentSongId = this.unshuffledSongs[index - 1].id;

    return this.unshuffledSongs[index - 1];
  };

  getCurrentSongIndex() {
    return this.isShuffling
      ? this.songs.indexOf(this.songs.find((s) => s.id === this.currentSongId)!)
      : this.unshuffledSongs.indexOf(this.songs.find((s) => s.id === this.currentSongId)!);
  }

  getCurrentSong() {
    return this.isShuffling ? this.songs[this.getCurrentSongIndex()] : this.unshuffledSongs[this.getCurrentSongIndex()];
  }

  shuffleSongs() {
    let currentIndex = this.songs.length;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      [this.songs[currentIndex], this.songs[randomIndex]] = [
        this.songs[randomIndex], this.songs[currentIndex]];
    }
  }

  resetQueue = () => {
    this.closeView();
    this.isPlaying = false;
    this.songs = [];
    this.unshuffledSongs = [];
    this.reseted.emit();
  };
}

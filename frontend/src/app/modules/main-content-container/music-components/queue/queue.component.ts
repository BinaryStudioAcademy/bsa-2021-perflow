import {
  Component, EventEmitter, Input, Output, ViewChild
} from '@angular/core';
import { Song } from 'src/app/models/song/song';
import { QueueService } from 'src/app/services/queue.service';
import { PlayingComponent } from '../playing/playing.component';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.sass']
})
export class QueueComponent {
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();
  @Output() togglePlayEvent = new EventEmitter<void>();
  @Output() reseted = new EventEmitter<void>();

  isOpened = false;
  isPlaying = false;

  @Input() songs: Song[] = [];

  currentSongId: number;

  @ViewChild(PlayingComponent)
  private _musicVisualizer: PlayingComponent;

  constructor(private _queueService: QueueService) {
    _queueService.songAdded$.subscribe((song) => {
      if (!this.songs.length) {
        this.currentSongId = song.id;
      }

      if (!this.songs.find((s) => s.id === song.id)) {
        this.songs.push(song);
      }
    });

    _queueService.nextSong$.subscribe(() => {
      _queueService.nextSongGot.emit(this.getNextSong());
    });

    _queueService.previousSong$.subscribe(() => {
      _queueService.previousSongGot.emit(this.getPreviousSong());
    });

    _queueService.currentSongUpdate.subscribe((song) => {
      this.currentSongId = song.id;
    });

    _queueService.playingToggled.subscribe((value) => {
      this.isPlaying = value;
    });

    _queueService.queueCleared$.subscribe(() => {
      this.songs = [];
    });
  }

  openView = () => {
    this.isOpened = true;
    this.opened.emit();
    this._musicVisualizer.draw();
  };

  closeView = () => {
    this.isOpened = false;
    this.closed.emit();
    this._musicVisualizer.interruptAnimation();
    console.log(this._musicVisualizer);
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

        if (!removingSong) {
          break;
        }

        if (this.songs.length === 1) {
          this.resetQueue();
        }

        if (this.currentSongId === removingSong.id) {
          this.switchToNearestAccessible();
        }

        this.removeSong(removingSong);
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

  removeSong = (song: Song) => {
    const indexForDelete = this.songs.indexOf(song);
    this.songs.splice(indexForDelete, 1);
  };

  togglePlay = () => {
    this.togglePlayEvent.emit();
  };

  getNextSong = () => {
    const index = this.getCurrentSongIndex();

    if (!this.songs.length || index + 1 >= this.songs.length) return null;

    this.currentSongId = this.songs[index + 1].id;

    return this.songs[index + 1];
  };

  getPreviousSong = () => {
    const index = this.getCurrentSongIndex();

    if (!this.songs.length || index - 1 < 0) return null;

    this.currentSongId = this.songs[index - 1].id;

    return this.songs[index - 1];
  };

  getCurrentSongIndex() {
    return this.songs.indexOf(this.songs.find((s) => s.id === this.currentSongId)!);
  }

  getCurrentSong() {
    return this.songs[this.getCurrentSongIndex()];
  }

  resetQueue = () => {
    this.closeView();
    this.isPlaying = false;
    this.songs = [];
    this.reseted.emit();
  };

  get analyser() {
    return this._musicVisualizer.analyser;
  }

  set analyser(value: AnalyserNode) {
    this._musicVisualizer.analyser = value;
  }

  draw() {
    this._musicVisualizer.draw();
  }
}

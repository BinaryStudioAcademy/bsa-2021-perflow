import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { Song } from 'src/app/models/song/song';
import { QueueService } from 'src/app/services/queue.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.sass']
})
export class QueueComponent {
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  isOpened = false;
  isPlaying = false;

  @Input() songs: Song[] = [];

  currentSongId: number;

  constructor(private _queueService: QueueService) {
    _queueService.songAdded$.subscribe((song) => {
      if (!this.songs.length) {
        this.currentSongId = song.id;
      }

      if (!this.songs.find((s) => s.id === song.id)) this.songs.push(song);
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
  };

  closeView = () => {
    this.isOpened = false;
    this.closed.emit();
  };

  clickMenuHandler(data: { menuItem: string, song: Song }) {
    switch (data.menuItem) {
      case 'Add to queue':
        this.songs = [...this.songs, data.song];
        break;
      default:
        break;
    }
  }

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
}

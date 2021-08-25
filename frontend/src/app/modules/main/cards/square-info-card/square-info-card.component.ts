import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { Song } from 'src/app/models/song/song';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { QueueService } from 'src/app/services/queue.service';

@Component({
  selector: 'app-square-info-card',
  templateUrl: './square-info-card.component.html',
  styleUrls: ['./square-info-card.component.sass']
})
export class SquareInfoCardComponent {
  @Input() id: number;
  @Input() name: string;
  @Input() description: string;
  @Input() iconUrl: string;

  @Input()
  isLiked = false;

  @Output()
  clickDislike = new EventEmitter<number>();

  dislike(id: number) {
    this.clickDislike.emit(id);
  }

  constructor(
    private _playlistsService: PlaylistsService,
    private _queueService: QueueService
  ) { }

  play = (id: number) => {
    this._playlistsService.getPlaylistSongs(id)
      .subscribe((result) => {
        const songs = result;

        this.updateQueue(songs);
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
}

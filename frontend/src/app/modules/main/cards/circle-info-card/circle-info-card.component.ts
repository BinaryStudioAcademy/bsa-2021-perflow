import { Component, Input } from '@angular/core';
import { Song } from 'src/app/models/song/song';
import { QueueService } from 'src/app/services/queue.service';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-circle-info-card',
  templateUrl: './circle-info-card.component.html',
  styleUrls: ['./circle-info-card.component.sass']
})
export class CircleInfoCardComponent {
  @Input() id: number;
  @Input() name: string;
  @Input() description: string;
  @Input() iconUrl: string;

  constructor(
    private _songsService: SongsService,
    private _queueService: QueueService
  ) { }

  playAlbum = (id: number) => {
    this._songsService.getSongsByAlbumId(id)
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

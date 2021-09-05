import { Component, Input } from '@angular/core';
import { take } from 'rxjs/operators';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { Song } from 'src/app/models/song/song';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { QueueService } from 'src/app/services/queue.service';

@Component({
  selector: 'app-your-mix-card',
  templateUrl: './your-mix-card.component.html',
  styleUrls: ['./your-mix-card.component.sass']
})
export class YourMixCardComponent {
  @Input()
  mix: PlaylistView = {} as PlaylistView;

  constructor(
    private _playlistsService: PlaylistsService,
    private _queueService: QueueService
  ) { }

  play = (id: number) => {
    this._playlistsService.getPlaylistSongs(id)
      .pipe(take(1))
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

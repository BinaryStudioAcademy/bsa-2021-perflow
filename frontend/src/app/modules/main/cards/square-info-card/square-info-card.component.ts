import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  @Input() isForEdit = false;
  @Input() editRouterLink: string | undefined = undefined;

  @Output()
  clickDislike = new EventEmitter<number>();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _playlistsService: PlaylistsService,
    private _queueService: QueueService
  ) { }

  dislike(id: number) {
    this.clickDislike.emit(id);
  }

  edit() {
    if (this.editRouterLink) {
      this._router.navigate([`${this.editRouterLink}/${this.id}`], { relativeTo: this._activatedRoute });
    }
  }

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

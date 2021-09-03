import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { Song } from 'src/app/models/song/song';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { QueueService } from 'src/app/services/queue.service';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.sass']
})
export class PlaylistCardComponent {
  @Input()
  playlist: PlaylistView = {} as PlaylistView;
  @Input()
  isCheckBox: boolean = false;
  @Input()
  isChecked: boolean;
  @Input()
  isDeletable: boolean = false;
  @Input()
  playlistSection: number;

  @Output()
  clickEmiter = new EventEmitter<void>();
  @Output()
  deleteFromSection = new EventEmitter<any>();
  @Output()
  addDeleteFromSection = new EventEmitter<PlaylistView>();

  constructor(
    private _playlistsService: PlaylistsService,
    private _queueService: QueueService,
    private _router: Router
  ) { }

  play = (id: number) => {
    this._playlistsService.getPlaylistSongs(id)
      .subscribe((result) => {
        const songs = result;

        this.updateQueue(songs);
      });
  };

  onDeleteFromSectionClick(playlist: PlaylistView) {
    const emitEntity = {
      ...playlist,
      section: this.playlistSection
    };
    this.deleteFromSection.emit(emitEntity);
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

  handleClick() {
    if (!this.isCheckBox) {
      this.clickEmiter.emit();
      this._router.navigateByUrl(`/playlists/view-playlist/${this.playlist.id}`);
    }
    else {
      this.isChecked = !this.isChecked;
      this.addDeleteFromSection.emit(this.playlist);
    }
  }
}

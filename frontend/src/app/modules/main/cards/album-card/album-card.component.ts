import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { Song } from 'src/app/models/song/song';
import { QueueService } from 'src/app/services/queue.service';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.sass']
})
export class AlbumCardComponent {
  @Input()
  isForEdit = false;
  @Input()
  isLiked = true;
  @Input()
  album: AlbumForReadDTO;
  @Output()
  delete = new EventEmitter<AlbumForReadDTO>();

  constructor(
    private _songsService: SongsService,
    private _queueService: QueueService
  ) { }

  onDeleteClick(album: AlbumForReadDTO) {
    this.delete.emit(album);
  }

  playAlbum = (id: number) => {
    this._songsService.getSongsByAlbumId(id)
      .subscribe((result) => {
        const songs = result;

        this.updateQueue(songs);
      })
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

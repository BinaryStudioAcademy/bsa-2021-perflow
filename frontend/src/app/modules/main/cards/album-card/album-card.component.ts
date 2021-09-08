import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { Router } from '@angular/router';
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
  @Input()
  isCheckBox: boolean = false;
  @Input()
  isChecked: boolean;
  @Input()
  isDeletable: boolean = false;
  @Input()
  isLikeButtonHidden: boolean = false;
  @Input()
  albumSection: number;
  @Input()
  showPublishedStatus: boolean = false;
  @Output()
  delete = new EventEmitter<AlbumForReadDTO>();
  @Output()
  deleteFromSection = new EventEmitter<any>();
  @Output()
  addDeleteFromSection = new EventEmitter<AlbumForReadDTO>();
  @Output()
  clickEmiter = new EventEmitter<void>();

  constructor(
    private _songsService: SongsService,
    private _queueService: QueueService,
    private _router: Router
  ) {
  }

  onDeleteClick(album: AlbumForReadDTO) {
    this.delete.emit(album);
  }

  onDeleteFromSectionClick(album: AlbumForReadDTO) {
    const emitEntity = {
      ...album,
      section: this.albumSection
    };
    this.deleteFromSection.emit(emitEntity);
  }

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

  handleClick() {
    if (!this.isCheckBox) {
      this.clickEmiter.emit();
      this._router.navigateByUrl(`/albums/${this.album.id}`);
    }
    else {
      this.isChecked = !this.isChecked;
      this.addDeleteFromSection.emit(this.album);
    }
  }
}

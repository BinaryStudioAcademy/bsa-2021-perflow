import {
  Component, Input, Output, EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthorType } from 'src/app/models/enums/author-type.enum';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { QueueService } from 'src/app/services/queue.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.sass']
})
export class ArtistCardComponent {
  @Input()
  isChecked: boolean = false;
  @Input()
  isLiked: boolean = false;
  @Input()
  artist: ArtistReadDTO;
  @Input()
  isCheckBox: boolean = false;
  @Input()
  isCheckedConstructor: boolean;
  @Input()
  isDeletable: boolean = false;
  @Input()
  artistSection: number;
  @Output()
  delete = new EventEmitter<ArtistReadDTO>();
  @Output()
  deleteFromSection = new EventEmitter<any>();
  @Output()
  addDeleteFromSection = new EventEmitter<ArtistReadDTO>();
  @Output()
  apply = new EventEmitter<ArtistReadDTO>();
  @Output()
  clickEmiter = new EventEmitter<void>();

  constructor(
    private _router: Router,
    private _songsService: SongsService,
    private _queueService: QueueService,
    private _snackBarService: SnackbarService
  ) { }

  onDeleteClick(artist: ArtistReadDTO) {
    this.delete.emit(artist);
  }

  onDeleteFromSectionClick(artist: ArtistReadDTO) {
    const emitEntity = {
      ...artist,
      section: this.artistSection
    };
    this.deleteFromSection.emit(emitEntity);
  }

  onApplyClick(artist: ArtistReadDTO) {
    this.apply.emit(artist);
  }

  handleClick() {
    if (!this.isCheckBox) {
      this.clickEmiter.emit();

      if (this.artist.isArtist) {
        this._router.navigateByUrl(`/artists/${this.artist.id}`);
      }
      else {
        this._router.navigateByUrl(`/groups/${this.artist.id}`);
      }
    }
    else {
      this.isChecked = !this.isChecked;
      this.addDeleteFromSection.emit(this.artist);
    }
  }

  play(artistId: number) {
    this._songsService.getTopSongsByAuthorId(
      artistId, 100, this.artist.isArtist ? AuthorType.artist : AuthorType.group
    )
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          if (data.length) {
            this._queueService.clearQueue();
            this._queueService.addSongsToQueue(data);
            const [first] = data;
            this._queueService.initSong(first, true);
          }
          else {
            this._snackBarService.show({ message: 'There is are any songs!' });
          }
        }
      });
  }
}

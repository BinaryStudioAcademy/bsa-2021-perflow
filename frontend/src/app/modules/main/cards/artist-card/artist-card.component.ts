import {
  Component, Input, Output, EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';

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

  constructor(private _router: Router) { }

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
}

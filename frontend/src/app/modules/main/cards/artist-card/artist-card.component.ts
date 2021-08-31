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
  isLiked: boolean = false;
  @Input()
  artist: ArtistReadDTO;
  @Input()
  isCheckBox: boolean = false;
  @Input()
  isChecked: boolean;
  @Output()
  delete = new EventEmitter<ArtistReadDTO>();
  @Output()
  addDeleteFromSection = new EventEmitter<ArtistReadDTO>();
  @Output()
  clickEmiter = new EventEmitter<void>();

  constructor(private _router: Router) {}

  onDeleteClick(artist: ArtistReadDTO) {
    this.delete.emit(artist);
  }

  handleClick() {
    if (!this.isCheckBox) {
      this.clickEmiter.emit();
      this._router.navigateByUrl(`/artists/${this.artist.id}`);
    }
    else {
      this.isChecked = !this.isChecked;
      this.addDeleteFromSection.emit(this.artist);
    }
  }
}

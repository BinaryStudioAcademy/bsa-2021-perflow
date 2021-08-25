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
  @Output()
  delete = new EventEmitter<ArtistReadDTO>();
  @Output()
  clickEmiter = new EventEmitter<void>();

  constructor(private _router: Router) {}

  onDeleteClick(artist: ArtistReadDTO) {
    this.delete.emit(artist);
  }

  redirectTo() {
    this.clickEmiter.emit();
    this._router.navigateByUrl(`/artists/${this.artist.id}`);
  }
}

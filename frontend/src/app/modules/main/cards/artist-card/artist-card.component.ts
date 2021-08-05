import {
  Component, Input, Output, EventEmitter
} from '@angular/core';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.sass']
})
export class ArtistCardComponent {
  @Input()
  artist: ArtistReadDTO;
  @Output()
  onDelete = new EventEmitter<ArtistReadDTO>();

  onDeleteClick(artist: ArtistReadDTO) {
    this.onDelete.emit(artist);
  }
}

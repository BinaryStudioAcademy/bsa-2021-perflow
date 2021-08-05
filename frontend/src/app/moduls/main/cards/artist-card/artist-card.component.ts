import {
  Component, Input, Output, EventEmitter
} from '@angular/core';
import { UserDTO } from 'src/app/models/user/UserDTO';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.sass']
})
export class ArtistCardComponent {
  @Input()
  artist: UserDTO;
  @Output()
  onDelete = new EventEmitter<UserDTO>();

  onDeleteClick(artist: UserDTO) {
    this.onDelete.emit(artist);
  }
}

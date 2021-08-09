import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.sass']
})
export class AlbumCardComponent {
  @Input()
  album: AlbumForReadDTO;
  @Output()
  delete = new EventEmitter<AlbumForReadDTO>();

  onDeleteClick(album: AlbumForReadDTO) {
    this.delete.emit(album);
  }
}

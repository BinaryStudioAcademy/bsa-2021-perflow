import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { Router } from '@angular/router';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';

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
  @Output()
  clickEmiter = new EventEmitter<void>();

  constructor(private _router: Router) {}

  onDeleteClick(album: AlbumForReadDTO) {
    this.delete.emit(album);
  }

  redirectTo() {
    this.clickEmiter.emit();
    this._router.navigateByUrl(`/albums/${this.album.id}`);
  }
}

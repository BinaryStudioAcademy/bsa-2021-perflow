import {
  Component, EventEmitter, Output, ViewChild
} from '@angular/core';
import { SongImageComponent } from 'src/app/modules/shared/upload/song-image/song-image.component';

@Component({
  selector: 'app-songs-upload-modal',
  templateUrl: './songs-upload-modal.component.html',
  styleUrls: ['./songs-upload-modal.component.sass']
})
export class SongsUploadModalComponent {
  @Output() isClosed = new EventEmitter<void>();
  @Output() isFilesSaved = new EventEmitter<File[]>();

  @ViewChild(SongImageComponent)
  uploadComponent: SongImageComponent;

  clickOnModal = (event: Event) => {
    event.stopPropagation();
  };

  cancelModal = () => {
    this.isClosed.emit();
  };

  uploadSongs = () => {
    this.isFilesSaved.emit(this.uploadComponent.files);
  };
}

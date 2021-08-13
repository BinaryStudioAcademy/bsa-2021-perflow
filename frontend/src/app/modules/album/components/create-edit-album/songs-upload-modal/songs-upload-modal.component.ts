import {
  Component, EventEmitter, Output
} from '@angular/core';

@Component({
  selector: 'app-songs-upload-modal',
  templateUrl: './songs-upload-modal.component.html',
  styleUrls: ['./songs-upload-modal.component.sass']
})
export class SongsUploadModalComponent {
  @Output() isClosed = new EventEmitter<void>();

  clickOnModal = (event: Event) => {
    event.stopPropagation();
  };

  cancelModal = () => {
    this.isClosed.emit();
  };
}

import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { AccessType } from 'src/app/models/playlist/accessType';
import { EditedPlaylist } from 'src/app/models/playlist/editedPlaylist';

@Component({
  selector: 'app-edit-playlist-modal',
  templateUrl: './edit-playlist-modal.component.html',
  styleUrls: ['./edit-playlist-modal.component.sass']
})
export class EditPlaylistModalComponent implements OnInit {
  file: File;
  public selectControlValues: AccessType[] = [AccessType.secret, AccessType.collaborative, AccessType.default];
  public tempIconURL: string;

  @Input() editedPlaylist: EditedPlaylist;

  @Output() isClosed = new EventEmitter<void>();

  @Output() editPlaylist = new EventEmitter<EditedPlaylist>();

  ngOnInit() {
    this.tempIconURL = this.editedPlaylist.iconURL;
  }

  public onSubmit() {
    this.editedPlaylist.iconURL = this.tempIconURL;
    this.editPlaylist.emit(this.editedPlaylist);
  }

  cancelModal() {
    this.isClosed.emit();
  }

  loadIcon = (event: Event) => {
    const [file] = Array.from((event.target as HTMLInputElement).files as FileList);

    const pattern = /.*(.jpg$|.png$|.jpeg$)/i;
    if (pattern.test(file.name)) {
      this.file = file;
      const reader = new FileReader();

      reader.onload = (event2: ProgressEvent<FileReader>) => {
        this.tempIconURL = event2.target?.result as string;
      };

      reader.readAsDataURL(this.file);
    }
  };

  clickOnModal = (event: Event) => {
    event.stopPropagation();
  };
}

import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { AccessType } from 'src/app/models/playlist/accessType';
import { EditedPlaylist } from 'src/app/models/playlist/editedPlaylist';
import { CroppedImageData } from 'src/app/models/shared/cropped.model';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';

@Component({
  selector: 'app-edit-playlist-modal',
  templateUrl: './edit-playlist-modal.component.html',
  styleUrls: ['./edit-playlist-modal.component.sass']
})
export class EditPlaylistModalComponent implements OnInit {
  isCropperModalShown = false;
  isColaborativeModalShown = false;

  readonly pattern = '.*(.jpg$|.png$|.jpeg$)';

  file: File;
  public selectControlValues: AccessType[] = [AccessType.secret, AccessType.collaborative, AccessType.default];
  public tempIconURL: string;

  @Input() editedPlaylist: EditedPlaylist;
  @Input() isAuthor: boolean;

  @Output() isClosed = new EventEmitter<void>();
  @Output() editPlaylist = new EventEmitter<EditedPlaylist>();

  @Input()
  collaborators = new Array<ArtistReadDTO>();
  @Output()
  collaboratorsChange = new EventEmitter<Array<ArtistReadDTO>>();

  ngOnInit() {
    this.tempIconURL = this.editedPlaylist.iconURL;
  }

  public onSubmit() {
    this.editedPlaylist.iconURL = this.tempIconURL;
    this.editedPlaylist.icon = this.file;
    this.editPlaylist.emit(this.editedPlaylist);
  }

  switchCropperImageModal() {
    this.isCropperModalShown = !this.isCropperModalShown;
  }

  switchColaborativeModal() {
    this.isColaborativeModalShown = !this.isColaborativeModalShown;
  }

  cancelModal() {
    this.isClosed.emit();
  }

  loadIcon = (event: Event) => {
    const [file] = Array.from((event.target as HTMLInputElement).files as FileList);

    if (RegExp(this.pattern).test(file.name)) {
      this.file = file;
      const reader = new FileReader();

      reader.onload = (event2: ProgressEvent<FileReader>) => {
        this.tempIconURL = event2.target?.result as string;
      };

      reader.readAsDataURL(this.file);

      this.isCropperModalShown = !this.isCropperModalShown;
    }
  };

  clickOnModal = (event: Event) => {
    event.stopPropagation();
  };

  onSubmitModal = (croppedFile: CroppedImageData) => {
    this.isCropperModalShown = !this.isCropperModalShown;
    this.file = croppedFile.croppedFile;
    this.tempIconURL = croppedFile.croppedImage;
  };

  isCollaborative = (accessType: AccessType) => accessType === AccessType.collaborative;
}

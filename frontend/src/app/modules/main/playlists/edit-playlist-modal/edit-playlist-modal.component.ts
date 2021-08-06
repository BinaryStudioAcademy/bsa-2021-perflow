import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import {
  FormControl, FormGroup, Validators
} from '@angular/forms';
import { AccessType } from 'src/app/models/playlist/accessType';
import { EditedPlaylist } from 'src/app/models/playlist/editedPlaylist';

@Component({
  selector: 'app-edit-playlist-modal',
  templateUrl: './edit-playlist-modal.component.html',
  styleUrls: ['./edit-playlist-modal.component.sass']
})
export class EditPlaylistModalComponent implements OnInit {
  file: File;
  public editPlaylistForm!: FormGroup;
  public selectControlValues: AccessType[] = [AccessType.secret, AccessType.collaborative, AccessType.default];

  public tempIconURL: string;

  @Input() editedPlaylist: EditedPlaylist;

  @Output()
  isClosed = new EventEmitter<void>();

  @Output()
  editPlaylist = new EventEmitter<EditedPlaylist>();

  ngOnInit() {
    this.editPlaylistForm = new FormGroup({
      name: new FormControl(
        this.editedPlaylist.name,
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ),
      description: new FormControl(
        this.editedPlaylist.description,
        [
          Validators.maxLength(200)
        ]
      ),
      iconURL: new FormControl(''),
      accessType: new FormControl(
        this.editedPlaylist.accessType,
        [Validators.required]
      )
    });

    this.tempIconURL = this.editedPlaylist.iconURL;
  }

  get name() {
    return this.editPlaylistForm.get('name')!;
  }

  get description() {
    return this.editPlaylistForm.get('description')!;
  }

  get iconURL() {
    return this.editPlaylistForm.get('iconURL')!;
  }

  get accessType() {
    return this.editPlaylistForm.get('accessType')!;
  }

  public onSubmit() {
    this.editedPlaylist = this.editPlaylistForm.value;
    this.editedPlaylist.iconURL = this.tempIconURL;
    this.editPlaylist.emit(this.editedPlaylist);
    this.editPlaylistForm.reset();
  }

  changeAccessType() {
    this.editedPlaylist.accessType = this.editPlaylistForm.get('accessType')?.value;
  }

  cancelModal() {
    this.isClosed.emit();
  }

  public onValidate() {
    if (this.editPlaylistForm.invalid
      && (
        this.editPlaylistForm.controls.name.hasError('required')
        || this.editPlaylistForm.controls.accessType.hasError('required')
      )) {
      return false;
    }
    return true;
  }

  loadIcon = (event: Event) => {
    const [file] = Array.from((event.target as HTMLInputElement).files as FileList);

    const pattern = /\S*.jpg$|\S*.png$|\S*.jpeg$/i;
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

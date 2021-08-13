import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { AlbumEdit } from 'src/app/models/album/album-edit';
import { AlbumRegion } from 'src/app/models/album/album-region';
import { AuthorType } from 'src/app/models/enums/author-type.enum';
import { Group } from 'src/app/models/group/group';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-edit-album-modal',
  templateUrl: './edit-album-modal.component.html',
  styleUrls: ['./edit-album-modal.component.sass']
})
export class EditAlbumModalComponent implements OnInit {
  readonly pattern = '.*(.jpg$|.png$|.jpeg$)';
  file: File;

  readonly albumRegionValues: AlbumRegion[] = [
    AlbumRegion.usa, AlbumRegion.uk, AlbumRegion.japan, AlbumRegion.eu, AlbumRegion.cis
  ];

  readonly albumAuthorTypeValues: AuthorType[] = [
    AuthorType.artist, AuthorType.group
  ];

  groups: Group[];
  userId: number;
  userName: string;
  tempIconURL: string;

  @Input() editedAlbum: AlbumEdit = { } as AlbumEdit;

  @Output() isClosed = new EventEmitter<void>();
  @Output() editAlbum = new EventEmitter<AlbumEdit>();

  constructor(
    private _groupService: GroupService,
    private _authService: AuthService
  ) {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => !!state))
      .subscribe((authState) => {
        this.userId = authState!.id;
        this.userName = authState!.userName;
        this.getGroups();
      });
  }

  ngOnInit() {
    this.tempIconURL = this.editedAlbum.iconURL;
  }

  getGroups = () => {
    this._groupService.getGroupsByArtist(this.userId)
      .subscribe({
        next: (data) => {
          this.groups = data;
        }
      });
  };

  public onSubmit() {
    this.editedAlbum.iconURL = this.tempIconURL;

    if (this.editedAlbum.authorType === AuthorType.artist) {
      this.editedAlbum.authorId = this.userId;
    }

    this.editAlbum.emit(this.editedAlbum);
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
    }
  };

  clickOnModal = (event: Event) => {
    event.stopPropagation();
  };

  cancelModal() {
    this.isClosed.emit();
  }

  authorTypeChange = () => {
    if (this.editedAlbum.authorType === AuthorType.group) {
      this.editedAlbum.groupId = this.groups[0].id;
      this.editedAlbum.authorId = undefined;
    }
    else {
      this.editedAlbum.authorId = this.userId;
      this.editedAlbum.groupId = undefined;
    }
  };
}

import {
  Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { AlbumEdit } from 'src/app/models/album/album-edit';
import { AlbumRegion } from 'src/app/models/album/album-region';
import { AuthorType } from 'src/app/models/enums/author-type.enum';
import { Group } from 'src/app/models/group/group';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GroupService } from 'src/app/services/group.service';

interface Author {
  name: string,
  value: number
}

@Component({
  selector: 'app-edit-album-modal',
  templateUrl: './edit-album-modal.component.html',
  styleUrls: ['./edit-album-modal.component.sass']
})
export class EditAlbumModalComponent implements OnInit {
  readonly pattern = '.*(.jpg$|.png$|.jpeg$)';
  readonly currentYear: number = new Date().getFullYear();
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
  authors = [] as Author[];
  isAuthorHidden: boolean = true;
  selectedIndex: number;

  @Input() editedAlbum: AlbumEdit = { } as AlbumEdit;

  @Output() isClosed = new EventEmitter<void>();
  @Output() editAlbum = new EventEmitter<AlbumEdit>();

  @ViewChild('author') selectElement: ElementRef<HTMLSelectElement>;

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

          if (this.groups?.length) {
            this.fillAuthors(this.groups);
          }
        }
      });
  };

  fillAuthors = (groups: Group[]) => {
    this.authors.push({ name: this.userName, value: 0 });

    groups.forEach((group) => {
      this.authors.push({ name: group?.name, value: group.id });
    });

    this.selectedIndex = this.editedAlbum.groupId ?? 0;

    this.isAuthorHidden = false;
  };

  public onSubmit() {
    this.editedAlbum.iconURL = this.tempIconURL;
    this.editedAlbum.icon = this.file;

    if (this.editedAlbum.authorType === AuthorType.artist) {
      this.editedAlbum.authorId = this.userId;
      this.editedAlbum.groupId = undefined;
    }
    else {
      this.editedAlbum.authorId = undefined;
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
    const index = +this.selectElement.nativeElement.value;

    if (index === 0) {
      this.editedAlbum = {
        ...this.editedAlbum,
        authorType: AuthorType.artist,
        authorId: this.userId,
        groupId: undefined
      };
    }
    else {
      this.editedAlbum = {
        ...this.editedAlbum,
        authorType: AuthorType.group,
        groupId: index,
        authorId: undefined
      };
    }
  };
}

import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { AlbumEdit } from 'src/app/models/album/album-edit';
import { AlbumRegion } from 'src/app/models/album/album-region';
import { AuthorType } from 'src/app/models/enums/author-type.enum';
import { Group } from 'src/app/models/group/group';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { ArtistsService } from 'src/app/services/artists/artist.service';
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
  artists: ArtistReadDTO[];

  isGroup: boolean = false;
  tempIconURL: string;

  @Input() editedAlbum: AlbumEdit = {
    albumRegion: AlbumRegion.cis,
    artistId: 0,
    authorType: AuthorType.artist,
    createdAt: new Date(),
    description: '',
    groupId: 0,
    iconURL: '',
    id: 0,
    isPublished: true,
    isSingle: false,
    name: '',
    releaseYear: 2020
  };

  @Output() isClosed = new EventEmitter<void>();
  @Output() editAlbum = new EventEmitter<AlbumEdit>();

  constructor(
    private _artistService: ArtistsService,
    private _groupService: GroupService
  ) { }

  ngOnInit() {
    this.tempIconURL = this.editedAlbum.iconURL;
    this.getGroups();
    this.getArtists();
  }

  getGroups = () => {
    this._groupService.getAllGroups()
      .subscribe({
        next: (data) => {
          this.groups = data;
        }
      });
  };

  getArtists = () => {
    this._artistService.getAllArtists()
      .subscribe({
        next: (data) => {
          this.artists = data;
        }
      });
  };

  public onSubmit() {
    this.editedAlbum.iconURL = this.tempIconURL;
    this.editAlbum.emit(this.editedAlbum);
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
    }
  };

  clickOnModal = (event: Event) => {
    event.stopPropagation();
  };
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumFull } from 'src/app/models/album/album-full';
import { Song } from 'src/app/models/song/song';
import { AlbumEdit } from 'src/app/models/album/album-edit';
import { AlbumRegion } from 'src/app/models/album/album-region';
import { AuthorType } from 'src/app/models/enums/author-type.enum';
import { AlbumService } from 'src/app/services/album.service';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-edit-album',
  templateUrl: './create-edit-album.component.html',
  styleUrls: ['./create-edit-album.component.sass']
})
export class CreateEditAlbumComponent implements OnInit, OnDestroy {
  album: AlbumFull = {
    id: 0,
    authorType: AuthorType.artist,
    description: '',
    iconURL: '',
    isPublished: false,
    isSingle: false,
    name: 'Album name',
    region: AlbumRegion.usa,
    releaseYear: new Date().getFullYear(),
    artist: undefined,
    group: undefined,
    songs: {} as Song[]
  };

  editedAlbum: AlbumEdit = {} as AlbumEdit;
  albumSongs: Array<Song> = new Array<Song>();
  isModalShown = false;
  isSongUploadShown = false;

  private _unsubscribe$ = new Subject<void>();
  private _id: number | undefined;
  private _isEditMode: boolean = false;

  constructor(
    private _albumService: AlbumService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._activatedRoute.paramMap.pipe(
      switchMap((params) => params.getAll('id'))
    ).subscribe((data) => {
      this._id = +data;
    });

    if (this._id) {
      this.startEditMode();
    }
    else {
      this._isEditMode = false;
      this.showEditAlbumModal();
    }
  }

  public ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  startEditMode() {
    this._isEditMode = true;

    this._albumService.getAlbum(this._id!)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this.album = data;
        },
        error: (err) => {
          this._router.navigateByUrl('/albums');
        }
      });
  }

  showEditAlbumModal = () => {
    this.editedAlbum = {
      ...this.album,
      authorId: this.album.id,
      groupId: this.album.group?.id,
      createdAt: new Date()
    };

    this.isModalShown = !this.isModalShown;
  };

  showUploadSongsModal = () => {
    this.isSongUploadShown = !this.isSongUploadShown;
  };

  onSubmitModal = (data: AlbumEdit) => {
    this.isModalShown = !this.isModalShown;

    if (this._isEditMode) {
      this.editAlbum(data);
    }
    else {
      this.createPlaylist(data);
    }
  };

  createPlaylist(album: AlbumEdit) {
    this._albumService.createAlbum(album)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this._router.navigateByUrl(`/albums/edit/${data.id}`);
        }
      });
  }

  editAlbum = (album: AlbumEdit) => {
    this.editedAlbum = {
      ...this.editedAlbum,
      name: album.name.trim() === '' ? 'Album name' : album.name
    };

    this._albumService.editAlbum(this.editedAlbum)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this.editedAlbum = data;
          this.album = {
            ...this.editedAlbum,
            songs: this.album.songs,
            artist: this.album.artist,
            group: this.album.group,
            releaseYear: data.releaseYear!
          };
        }
      });
  };

  closeUpload() {
    this.isSongUploadShown = !this.isSongUploadShown;
  }

  closeModal() {
    this.isModalShown = !this.isModalShown;

    if (!this._isEditMode) {
      this._router.navigateByUrl('albums');
    }

    this.editedAlbum = {
      iconURL: '',
      id: 0,
      name: '',
      releaseYear: undefined,
      description: '',
      authorId: undefined,
      groupId: undefined,
      region: AlbumRegion.usa,
      authorType: AuthorType.artist,
      createdAt: new Date(),
      isPublished: true,
      isSingle: false
    };
  }

  removeAlbum() {
    this._albumService.removeAlbum(this.album.id)
      .subscribe({
        next: () => {
          this._router.navigateByUrl('/albums');
        }
      });
  }
}

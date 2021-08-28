import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlbumFull } from 'src/app/models/album/album-full';
import { Song } from 'src/app/models/song/song';
import { AlbumEdit } from 'src/app/models/album/album-edit';
import { AlbumRegion } from 'src/app/models/album/album-region';
import { AuthorType } from 'src/app/models/enums/author-type.enum';
import { AlbumService } from 'src/app/services/album.service';
import { Subject, timer } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AudioFileDuration } from 'src/app/helpers/AudioFileDuration';
import { SongsService } from 'src/app/services/songs/songs.service';
import { SongWriteDTO } from 'src/app/models/song/song-write';
import { AlbumPublicStatus } from 'src/app/models/album/аlbum-public-status';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ClipboardService } from 'ngx-clipboard';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-create-edit-album',
  templateUrl: './create-edit-album.component.html',
  styleUrls: ['./create-edit-album.component.sass']
})
export class CreateEditAlbumComponent implements OnInit, OnDestroy {
  album: AlbumFull = {} as AlbumFull;

  editedAlbum: AlbumEdit = {} as AlbumEdit;
  albumSongs: Array<Song> = new Array<Song>();
  isModalShown = false;
  isSongUploadShown = false;
  publishButtonTitle: string = 'Publish';
  isSuccess: boolean = false;

  private _unsubscribe$ = new Subject<void>();
  private _id: number | undefined;
  private _isEditMode: boolean = false;

  constructor(
    private _albumService: AlbumService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _songsService: SongsService,
    private _authService: AuthService,
    private _clipboardApi: ClipboardService,
    private _location: PlatformLocation
  ) { }

  ngOnInit() {
    this.album = this.getBasicAlbumFull();

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

          this.publishButtonTitle = this.album.isPublished ? 'Unpublish' : 'Publish';
        },
        error: (err) => {
          this._router.navigateByUrl('/albums');
        }
      });
  }

  showEditAlbumModal = () => {
    this.editedAlbum = {
      ...this.album,
      authorId: this.album.artist ? this.album.artist?.id : undefined,
      groupId: this.album.group ? this.album.group?.id : undefined,
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
      return;
    }

    this.createAlbum(data);
  };

  createAlbum(album: AlbumEdit) {
    this._albumService.createAlbum(album)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this._router.navigateByUrl(`/perflowstudio/albums/edit/${data.id}`);
        }
      });
  }

  editAlbum = (album: AlbumEdit) => {
    this.editedAlbum = {
      ...album,
      name: album.name.trim() === '' ? 'Album name' : album.name
    };

    this._albumService.editAlbum(this.editedAlbum)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this._albumService.getAlbum(data.id)
            .subscribe({
              next: (result) => {
                this.album = result;
              }
            });
        }
      });
  };

  uploadSongs = (songs: File[]) => {
    songs.map((s) => {
      const subscription = AudioFileDuration.getDuration(s)
        .subscribe({
          next: (time: number) => {
            const songForWrite = new SongWriteDTO();
            songForWrite.albumId = this.album.id;
            songForWrite.authorType = this.album.authorType;
            songForWrite.duration = Math.floor(time);
            songForWrite.hasCensorship = false;
            songForWrite.name = s.name.split('.').slice(0, -1).join('.');

            this._songsService.uploadSong(songForWrite, s)
              .pipe(take(1))
              .subscribe((uploadedSong) => {
                this.album.songs.push(uploadedSong);
              });

            subscription.unsubscribe();
          }
        });
      return subscription;
    });

    this.closeUpload();
  };

  closeUpload() {
    this.isSongUploadShown = !this.isSongUploadShown;
  }

  closeModal() {
    this.isModalShown = !this.isModalShown;

    if (!this._isEditMode) {
      this._router.navigateByUrl('/perflowstudio/albums');
    }

    this.editedAlbum = {
      ...this.getBasicAlbumFull(),
      authorId: undefined,
      groupId: undefined,
      createdAt: new Date()
    };
  }

  removeAlbum() {
    this._albumService.removeAlbum(this.album.id)
      .subscribe({
        next: () => {
          this._router.navigateByUrl('/perflowstudio/albums');
        }
      });
  }

  getBasicAlbumFull = () => ({
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
    songs: {} as Song[],
    isLiked: false
  });

  clickMenuHandler(data: { menuItem: string, song: Song }) {
    switch (data.menuItem) {
      case 'Remove from playlist':
        this.deleteSongFromPlaylist(data.song);
        break;
      default:
        break;
    }
  }

  deleteSongFromPlaylist = (song: Song) => {
    if (this.album.songs.find((s) => s.id === song.id)) {
      this._songsService.deleteSong(song.id)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe({
          next: () => {
            this.albumSongs = this.album.songs.filter((s) => s.id !== song.id);
            this.album.songs = this.albumSongs;
          }
        });
    }
  };

  setPublicStatus() {
    const albumPublicStatus: AlbumPublicStatus = {
      ...this.album,
      isPublished: !this.album.isPublished
    };

    this._albumService.changeAlbumPublicStatus(albumPublicStatus)
      .subscribe({
        next: (data) => {
          this.album.isPublished = !this.album.isPublished;
          this.publishButtonTitle = this.album.isPublished ? 'Unpublish' : 'Publish';
        }
      });
  }

  copyLink() {
    this._clipboardApi.copyFromContent(`${this._location.hostname}:${this._location.port}/albums/${this.album.id}`);
    this.isSuccess = true;
    timer(3000).subscribe((val) => {
      this.isSuccess = Boolean(val);
    });
  }
}

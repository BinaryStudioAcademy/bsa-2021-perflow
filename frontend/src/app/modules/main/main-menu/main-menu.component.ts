import { HttpResponse } from '@angular/common/http';
import {
  Component, ElementRef, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import {
  filter, first, take, takeUntil
} from 'rxjs/operators';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistName } from 'src/app/models/playlist/playlist-name';
import { ClipboardService } from 'ngx-clipboard';
import { PlatformLocation } from '@angular/common';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { AccessType } from 'src/app/models/playlist/accessType';
import { PlaylistEditorsService } from 'src/app/services/playlists/playlist-editors.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ConfirmationPageService } from 'src/app/services/confirmation-page.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Song } from 'src/app/models/song/song';
import { RadioService } from 'src/app/services/radio.service';
import { QueueService } from 'src/app/services/queue.service';
import { CreatePlaylistService } from '../../shared/playlist/create-playlist/create-playlist.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass']
})
export class MainMenuComponent implements OnDestroy, OnInit {
  @ViewChild('ddmenu') menu: ElementRef;

  playlists: PlaylistName[] = [];
  collaborativePlaylists: PlaylistName[] = [];
  editedPlaylist = {} as PlaylistName;
  isEditPlaylistMode: boolean = false;
  isConfirmationModalShown: boolean = false;
  userId: number;
  confirmMessage: string;

  private _action: string;
  private _tempPlaylist = {} as PlaylistName;
  private _isOnCollaborativePlaylistClick: boolean = false;

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _playlistsService: PlaylistsService,
    private _createdPlaylistService: CreatePlaylistService,
    private _router: Router,
    private _clipboardApi: ClipboardService,
    private _location: PlatformLocation,
    private _playlistEditorsService: PlaylistEditorsService,
    private _authService: AuthService,
    private _confirmationService: ConfirmationPageService,
    private _snackbarService: SnackbarService,
    private _queueService: QueueService,
    private _radioService: RadioService
  ) { }

  public ngOnInit() {
    this._authService.getAuthStateObservableFirst()
      .pipe(filter((state) => !!state))
      .subscribe((authState) => {
        this.userId = authState!.id;
      });

    this.getUserCreatedPlaylists();

    this._createdPlaylistService.playlistChanged$.subscribe((playlist) => {
      const playlistIndex = this.playlists.findIndex((pl) => pl.id === playlist?.id);
      const collaborativeIndex = this.collaborativePlaylists.findIndex((pl) => pl.id === playlist?.id);

      if (playlistIndex === -1 && collaborativeIndex === -1) {
        this.playlists.push(playlist!);
      }
      else if (collaborativeIndex !== -1) {
        this.collaborativePlaylists[collaborativeIndex] = playlist!;
      }
      else {
        this.playlists[playlistIndex] = playlist!;
      }
    });

    this._createdPlaylistService.playlistDeleted$
      .subscribe((id) => {
        this.playlists = this.playlists.filter((pl) => pl.id !== id);
        this.collaborativePlaylists = this.collaborativePlaylists.filter((pl) => pl.id !== id);
      });
  }

  public ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public async getUserCreatedPlaylists() {
    this._playlistsService
      .getUserCreatedPlaylists()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (resp: HttpResponse<PlaylistName[]>) => {
          this.playlists = resp.body!;
          this._createdPlaylistService.fillCreatedPlylistsArray(resp.body! as PlaylistName[]);
          this.loadCollaborativePlaylists();
        }
      );
  }

  playlistSettingsClick = (playist: PlaylistName, e: MouseEvent, isCollaborative: boolean = false) => {
    const menu = (this.menu.nativeElement as HTMLDivElement);
    const height = window.innerHeight - e.clientY;
    const menuHeight: number = 500;

    if (height > menuHeight) {
      menu.style.top = `${e.clientY + 10}px`!;
      menu.style.left = `${e.clientX! + 5}px`!;
    }
    else {
      menu.style.bottom = `${height!}px`!;
      menu.style.left = `${e.clientX! + 5}px`!;
    }

    if (playist.id === this._tempPlaylist.id) {
      menu.classList.toggle('show');
    }
    else {
      menu.classList.add('show');
    }

    this._isOnCollaborativePlaylistClick = isCollaborative;
    this._tempPlaylist = playist;
  };

  clickOnMenuItem(item: string) {
    (this.menu.nativeElement as HTMLDivElement).classList.toggle('show');

    switch (item) {
      case 'Rename':
        this.renamePlaylist();
        this.editedPlaylist = this._tempPlaylist;
        break;
      case 'Create similar playlist':
        this.createSimilarPlaylist();
        break;
      case 'Edit details':
        this.editPlaylist();
        break;
      case 'Make Secret':
        this.changeAccessType(AccessType.secret);
        break;
      case 'Make Default':
        this.changeAccessType(AccessType.default);
        break;
      case 'Delete':
        this.initConfirmDeletePlaylist();
        break;
      case 'Create playlist':
        this.createPlaylist();
        break;
      case 'Copy link':
        this.copyLink();
        break;
      default:
        break;
    }
  }

  copyLink() {
    this._clipboardApi.copyFromContent(
      `${this._location.hostname}:${this._location.port}/playlists/view-playlist/${this._tempPlaylist.id}`
    );

    this._snackbarService.show({ message: 'Link copied to clipboard!' });
  }

  createPlaylist() {
    this._router.navigateByUrl('/playlists/create');
  }

  deletePlaylist() {
    if (this._isOnCollaborativePlaylistClick) {
      this._playlistEditorsService.remove({ playlistId: this._tempPlaylist.id, userId: this.userId })
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.collaborativePlaylists = this.collaborativePlaylists.filter((cp) => cp.id !== this._tempPlaylist.id);
            this._isOnCollaborativePlaylistClick = false;
          }
        });
    }
    else {
      this._playlistsService.deletePlaylist(this._tempPlaylist.id)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe({
          next: (id) => {
            this._createdPlaylistService.deletePlaylist(id);
            if (this._router.url === `/playlists/view-playlist/${id}`
              || this._router.url === `/playlists/edit/${id}`) {
              this._router.navigateByUrl('/playlists/all');
            }
          }
        });
    }
  }

  changeAccessType(accessType: AccessType) {
    this._tempPlaylist.accessType = accessType;
    this._playlistsService.changeAccessType(this._tempPlaylist)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          const playlistIndex = this.playlists.findIndex((pl) => pl.id === this._tempPlaylist?.id);
          this.playlists[playlistIndex].accessType = data.accessType;
          this.editedPlaylist = {} as PlaylistName;
          this._tempPlaylist = {} as PlaylistName;
        }
      });
  }

  editPlaylist() {
    this._router.navigateByUrl(`/playlists/edit/${this._tempPlaylist.id}`);
  }

  createSimilarPlaylist() {
    this._playlistsService.copyPlaylist(this._tempPlaylist)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          const temp = { ...data } as Playlist;
          this._createdPlaylistService.addPlaylist(temp);
        }
      });
  }

  renamePlaylist() {
    this.isEditPlaylistMode = true;
  }

  clickOutside() {
    (this.menu.nativeElement as HTMLDivElement).classList.remove('show');
  }

  clickOutsidePlaylistName() {
    this.isEditPlaylistMode = !this.isEditPlaylistMode;
    this.editPlaylistName();
  }

  inputKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.editPlaylistName();
    }
  }

  editPlaylistName() {
    this._playlistsService.editPlaylistName(this.editedPlaylist)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: () => {
          const playlistIndex = this.playlists.findIndex((pl) => pl.id === this.editedPlaylist?.id);
          const collaborativeIndex = this.collaborativePlaylists.findIndex((pl) => pl.id === this.editedPlaylist?.id);

          if (collaborativeIndex !== -1) {
            this.collaborativePlaylists[collaborativeIndex] = this.editedPlaylist!;
            this._createdPlaylistService.editCollaborativePlaylistName(this.editedPlaylist);
          }
          else {
            this.playlists[playlistIndex] = this.editedPlaylist!;
            this._createdPlaylistService.editPlaylistName(this.editedPlaylist);
          }

          this.editedPlaylist = {} as PlaylistName;
          this._tempPlaylist = {} as PlaylistName;
        }
      });
  }

  canShare() {
    return this._tempPlaylist.accessType !== AccessType.secret;
  }

  loadCollaborativePlaylists() {
    this._playlistEditorsService.getCollaborativePlaylistsOfCurrentUser()
      .pipe(first())
      .subscribe(
        (reuslt) => {
          this.collaborativePlaylists = reuslt.filter((p) => !this.isByThisAuthor(p.id));
        }
      );
  }

  isByThisAuthor(playlistId: number) {
    return this.playlists.find((p) => p.id === playlistId) !== undefined;
  }

  isPlaylistCollaborativeSettings() {
    return this.collaborativePlaylists.find((p) => p.id === this._tempPlaylist.id) !== undefined;
  }

  initConfirmDeletePlaylist() {
    this._confirmationService
      .initConfirmation(
        'Are you sure you want to delete the playlist?',
        () => {
          this.deletePlaylist();
        },
        () => {}
      );
  }

  isPlaylistSecret() {
    return this._tempPlaylist.accessType === AccessType.secret;
  }

  play(songs: Song[]) {
    if (!songs?.length) {
      return;
    }

    this._queueService.clearQueue();
    this._queueService.addSongsToQueue(songs);

    const [firstSong] = songs;

    this._queueService.initSong(firstSong, true);
  }

  startRadio() {
    this._radioService.getRadioByPlaylistId(this._tempPlaylist.id)
      .pipe(take(1))
      .subscribe((songs) => {
        if (songs.length > 0) {
          this.play(songs);
          this._snackbarService.show({ message: 'Radio started' });
        }
        else {
          this._snackbarService.show({ message: 'No songs found' });
        }
      });
  }
}

import {
  Component, OnInit, OnDestroy
} from '@angular/core';
import { Subject, timer } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, filter, switchMap, takeUntil
} from 'rxjs/operators';
import { Song } from 'src/app/models/song/song';
import { AccessType } from 'src/app/models/playlist/accessType';
import { Playlist } from 'src/app/models/playlist/playlist';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EditedPlaylist } from 'src/app/models/playlist/editedPlaylist';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CreatePlaylistService } from 'src/app/modules/shared/playlist/create-playlist/create-playlist.service';
import { ClipboardService } from 'ngx-clipboard';
import { PlatformLocation } from '@angular/common';
import { PlaylistForSave } from 'src/app/models/playlist/playlist-for-save';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-create-edit-playlist',
  templateUrl: './create-edit-playlist.component.html',
  styleUrls: ['./create-edit-playlist.component.sass']
})
export class CreateEditPlaylistComponent implements OnInit, OnDestroy {
  isModalShown = false;
  foundSongs: Array<Song> = new Array<Song>();
  playlistSongs: Array<Song> = new Array<Song>();
  previousPlaylistData: EditedPlaylist;
  playlist = {} as Playlist;
  searchValue: string;
  userId: number;
  isSuccess: boolean = false;

  private _id: number | undefined;

  private _searchTerms = new Subject<string>();
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _playlistService: PlaylistsService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _createdPlaylistService: CreatePlaylistService,
    private _searchService: SearchService,

    private _clipboardApi: ClipboardService,
    private _location: PlatformLocation
  ) {
    this._authService.getAuthStateObservableFirst()
      .pipe(filter((state) => !!state))
      .subscribe((authState) => {
        this.userId = authState!.id;
      });
  }

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
      this.createPlaylist();
    }

    this.setSearch();

    this._createdPlaylistService.playlistEditName$
      .subscribe({
        next: (data) => {
          if (this.playlist.id === data.id) {
            this.playlist = {
              ...this.playlist,
              ...data
            };
          }
        }
      });
  }

  public ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  startEditMode() {
    this._playlistService.getPlaylist(this._id!)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this.playlist = data;
        },
        error: (err) => {
          this._router.navigate(['../../../playlists'], { relativeTo: this._activatedRoute });
        }
      });

    this._playlistService.getPlaylistSongs(this._id!)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this.playlistSongs = data;
        }
      });
  }

  createPlaylist() {
    this.playlist = {
      ...this.playlist,
      id: 0,
      name: 'Playlist title',
      iconURL: '../../../../assets/images/playlist_default.jpg',
      accessType: AccessType.default,
      author: { id: this.userId } as User
    };

    this._playlistService.createPlaylist(this.playlist)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this._router.navigate([`../edit/${data.id}`], { relativeTo: this._activatedRoute });
          this._createdPlaylistService.addPlaylist(data);
        }
      });
  }

  setSearch() {
    this._searchTerms.pipe(
      takeUntil(this._unsubscribe$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this._searchService.getSongsByName({
        searchTerm: term, page: 1, itemsOnPage: 30
      }))
    ).subscribe({
      next: (data) => {
        this.foundSongs = data;
      }
    });
  }

  editPlaylist = (editedPlaylist: EditedPlaylist) => {
    if (editedPlaylist.name.trim() !== '') {
      this.playlist.name = editedPlaylist.name;
    }

    this.playlist = {
      ...this.playlist,
      description: editedPlaylist.description,
      iconURL: editedPlaylist.iconURL,
      accessType: editedPlaylist.accessType,
      name: editedPlaylist.name.trim() !== '' ? editedPlaylist.name : this.playlist.name,
      songs: {} as Song[]
    };

    const pl: PlaylistForSave = {
      ...editedPlaylist,
      id: this.playlist.id
    };

    this._playlistService.editPlaylist(pl)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this.playlist = data;
          this._createdPlaylistService.addPlaylist(data);
        }
      });
  };

  deletePlaylist() {
    this._playlistService.deletePlaylist(this.playlist.id)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (id) => {
          this._createdPlaylistService.deletePlaylist(id);
          this._router.navigate(['../../../playlists'], { relativeTo: this._activatedRoute });
        }
      });
  }

  addSongToPlaylist(song: Song) {
    if (!this.playlistSongs.find((s) => s.id === song.id)) {
      const playlistSong = { playlistId: this.playlist.id, songId: song.id };
      this._playlistService.addSongToPlaylist(playlistSong)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe({
          next: () => {
            this.foundSongs = this.foundSongs.filter((s) => s.id !== song.id);
            this.playlistSongs = [...this.playlistSongs, song];
            this.playlist.songs = this.playlistSongs;
          }
        });
    }
  }

  deleteSongFromPlaylist(song: Song) {
    if (this.playlistSongs.find((s) => s.id === song.id)) {
      const playlistSong = { playlistId: this.playlist.id, songId: song.id };
      this._playlistService.deleteSongToPlaylist(playlistSong)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe({
          next: (data) => {
            this.playlistSongs = this.playlistSongs.filter((s) => s.id !== data.songId);
            this.playlist.songs = this.playlistSongs;
          }
        });
    }
  }

  showEditPlaylistModal = () => {
    this.previousPlaylistData = {
      name: this.playlist.name,
      description: this.playlist.description,
      accessType: this.playlist.accessType,
      iconURL: this.playlist.iconURL
    };

    this.isModalShown = !this.isModalShown;
  };

  onSubmitModal = (data: EditedPlaylist) => {
    this.isModalShown = !this.isModalShown;
    this.editPlaylist(data);
  };

  closeModal() {
    this.isModalShown = !this.isModalShown;

    this.previousPlaylistData = {
      name: '',
      description: '',
      accessType: AccessType.default,
      iconURL: ''
    };
  }

  findSongsByName() {
    if (this.searchValue.trim() !== '') {
      this._searchTerms.next(this.searchValue);
    }
    else {
      this.foundSongs = [];
    }
  }

  clickMenuHandler(data: { menuItem: string, song: Song }) {
    switch (data.menuItem) {
      case 'Add to playlist':
        this.addSongToPlaylist(data.song);
        break;
      case 'Remove from playlist':
        this.deleteSongFromPlaylist(data.song);
        break;
      default:
        break;
    }
  }

  clearSearch(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchValue = '';
      this.foundSongs = new Array<Song>();
    }
  }

  copyLink() {
    this._clipboardApi.copyFromContent(
      `${this._location.hostname}:${this._location.port}/playlists/view-playlist/${this.playlist.id}`
    );
    this.isSuccess = true;
    timer(3000).subscribe((val) => {
      this.isSuccess = Boolean(val);
    });
  }
}

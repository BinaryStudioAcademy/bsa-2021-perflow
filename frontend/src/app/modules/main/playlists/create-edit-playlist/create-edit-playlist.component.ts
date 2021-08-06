import {
  Component, OnInit, OnDestroy, Input
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, takeUntil
} from 'rxjs/operators';
import { Song } from 'src/app/models/song/song';
import { AccessType } from 'src/app/models/playlist/accessType';
import { Playlist } from 'src/app/models/playlist/playlist';
import { SongsService } from 'src/app/services/songs/songs.service';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { Router } from '@angular/router';
import { EditedPlaylist } from 'src/app/models/playlist/editedPlaylist';

@Component({
  selector: 'app-create-edit-playlist',
  templateUrl: './create-edit-playlist.component.html',
  styleUrls: ['./create-edit-playlist.component.sass']
})
export class CreateEditPlaylistComponent implements OnInit, OnDestroy {
  public isModalShown = false;
  public foundSongs: Array<Song> = new Array<Song>();
  public playlistSongs: Array<Song> = new Array<Song>();
  public previousPlaylistData: EditedPlaylist;
  public playlist = {} as Playlist;

  @Input() givenPlaylist = {} as Playlist;

  private _searchTerms = new Subject<string>();
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _playlistService: PlaylistsService,
    private _songService: SongsService,
    private _router: Router
  ) { }

  ngOnInit() {
    if (!this.givenPlaylist.name) {
      this.playlist.name = 'Playlist title';
      this.playlist.accessType = AccessType.default;
      this.createPlaylist();
    }
    else {
      this.playlist = this.givenPlaylist;
    }

    this._searchTerms.pipe(
      takeUntil(this._unsubscribe$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this._songService.getSongsByName(term))
    ).subscribe({
      next: (data) => {
        this.foundSongs = data;
      }
    });
  }

  public ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  createPlaylist() {
    this._playlistService.savePlaylist(this.playlist)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this.playlist = data;
        }
      });
  }

  editPlaylist = (editedPlaylist: EditedPlaylist) => {
    if (editedPlaylist.name.trim() !== '') {
      this.playlist.name = editedPlaylist.name;
    }

    this.playlist.description = editedPlaylist.description;
    this.playlist.iconURL = editedPlaylist.iconURL;
    this.playlist.accessType = editedPlaylist.accessType;

    this._playlistService.editPlaylist(this.playlist)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this.playlist = data;
        }
      });
  };

  deletePlaylist() {
    this._playlistService.deletePlaylist(this.playlist.id)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this._router.navigateByUrl('/playlists');
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
            this.playlistSongs.push(song);
            this.playlistSongs = this.playlistSongs.filter((s) => s);
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

  findSongsByName(term: string) {
    if (term.trim() !== '') {
      this._searchTerms.next(term);
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
}

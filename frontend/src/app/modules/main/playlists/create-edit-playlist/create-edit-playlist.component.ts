import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, takeUntil
} from 'rxjs/operators';
import { Song } from 'src/app/models/song/song';
import { User } from 'src/app/models/user/user';
import { AccessType } from 'src/app/models/playlist/accessType';
import { Playlist } from 'src/app/models/playlist/playlist';
import { SongsService } from 'src/app/services/songs/songs.service';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';

@Component({
  selector: 'app-create-edit-playlist',
  templateUrl: './create-edit-playlist.component.html',
  styleUrls: ['./create-edit-playlist.component.sass']
})
export class CreateEditPlaylistComponent implements OnInit, OnDestroy {
  file: File;
  public selectControlValues: AccessType[] = [AccessType.secret, AccessType.collaborative, AccessType.default];

  public isModalShown = false;
  public playlist = {} as Playlist;
  public foundSongs: Array<Song> = new Array<Song>();
  public playlistSongs: Array<Song> = new Array<Song>();
  public previousDataObject = {
    name: '',
    description: '',
    accessType: AccessType.default,
    iconURL: ''
  };

  private _searchTerms = new Subject<string>();
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _playlistService: PlaylistsService,
    private _songService: SongsService
  ) { }

  ngOnInit() {
    this.playlist.id = 0;
    this.playlist.name = 'Playlist Title';
    this.playlist.accessType = AccessType.default;
    this.playlist.createdAt = new Date();
    this.playlist.author = { id: 1 } as User;
    this.playlist.iconURL = '';

    // this.createPlaylist();

    this._searchTerms.pipe(
      takeUntil(this._unsubscribe$),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((term: string) => this._songService.getSongsByName(term))
    ).subscribe({
      next: (data) => {
        this.foundSongs = data;
      }
    });
  }

  addSongToPlaylist(song: any) {
    if (!this.playlistSongs.find((s) => s.id === song.id)) {
      this.foundSongs = this.foundSongs.filter((s) => s.id !== song.id);
      this.playlistSongs.push(song);
    }
  }

  createPlaylist() {
    this._playlistService.savePlaylist(this.playlist as Playlist)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this.playlist = data;
        }
      });
  }

  findSongsByName(term: string) {
    this._searchTerms.next(term);
  }

  cancelModal() {
    this.hideEditPlaylistModal();
    this.previousDataObject = {
      name: '',
      description: '',
      accessType: AccessType.default,
      iconURL: ''
    };
  }

  deleteSongFromPlaylist(song: Song) {
    this.playlistSongs = this.playlistSongs.filter((s) => s.id !== song.id);
  }

  public ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  showEditPlaylistModal = () => {
    this.previousDataObject = {
      name: this.playlist.name,
      description: this.playlist.description,
      accessType: this.playlist.accessType,
      iconURL: this.playlist.iconURL
    };

    this.isModalShown = !this.isModalShown;
  };

  hideEditPlaylistModal = () => {
    this.isModalShown = !this.isModalShown;
  };

  editPlaylist = (ngForm: NgForm) => {
    if (ngForm.valid) {
      this.playlist.name = this.previousDataObject.name;
      this.playlist.description = this.previousDataObject.description;
      this.playlist.iconURL = this.previousDataObject.iconURL;
      this.playlist.accessType = this.previousDataObject.accessType;

      this._playlistService.editPlaylist(this.playlist)
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe({
          next: (data) => {
            this.playlist = data;
          },
          error: (err) => {

          }
        });
    }
    this.hideEditPlaylistModal();
  };

  loadIcon = (event: Event) => {
    const [file] = Array.from((event.target as HTMLInputElement).files as FileList);
    this.file = file;
    const reader = new FileReader();

    reader.onload = (event2: ProgressEvent<FileReader>) => {
      this.previousDataObject.iconURL = event2.target?.result as string;
    };

    reader.readAsDataURL(this.file);
  };
}

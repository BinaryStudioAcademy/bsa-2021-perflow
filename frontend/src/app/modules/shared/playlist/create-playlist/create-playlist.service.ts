import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistName } from 'src/app/models/playlist/playlist-name';

@Injectable({
  providedIn: 'root'
})
export class CreatePlaylistService {
  private _createdPlylists = [] as PlaylistName[];

  private _playlistSubject$ = new Subject<Playlist | null>();
  playlistChanged$ = this._playlistSubject$.asObservable();

  private _deletedPlaylistSubject$ = new Subject<number>();
  playlistDeleted$ = this._deletedPlaylistSubject$.asObservable();

  private _editedNameSubject$ = new Subject<PlaylistName>();
  playlistEditName$ = this._editedNameSubject$.asObservable();

  addPlaylist(playlist: Playlist) {
    this._playlistSubject$.next(playlist);

    const temp = { id: playlist.id, name: playlist.name } as PlaylistName;

    const playlistIndex = this._createdPlylists.findIndex((pl) => pl.id === playlist?.id);
    if (playlistIndex === -1) {
      this._createdPlylists.push(temp);
    }
    else {
      this._createdPlylists[playlistIndex] = temp;
    }
  }

  editPlaylistName(playlist: PlaylistName) {
    this._editedNameSubject$.next(playlist);
    this._createdPlylists.find((pl) => pl.id === playlist.id)!.name = playlist.name;
  }

  deletePlaylist(id: number) {
    this._deletedPlaylistSubject$.next(id);
    this._createdPlylists = this._createdPlylists.filter((pl) => pl.id !== id);
  }

  getChachedPlaylists(): Observable<PlaylistName[]> {
    return of(this._createdPlylists);
  }

  fillCreatedPlylistsArray(array: PlaylistName[]) {
    this._createdPlylists = array;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Playlist } from 'src/app/models/playlist';

@Injectable({
  providedIn: 'root'
})
export class CreatePlaylistService {
  lastPlaylist: Playlist = {
    id: 0,
    createdAt: new Date(),
    name: '',
    description: '',
    iconURL: ''
  };

  private _lastDeletedPlaylistId: number = 0;

  private _playlistSubject$ = new BehaviorSubject<Playlist | null>(this.lastPlaylist);
  playlistChanged$ = this._playlistSubject$.asObservable();

  private _deletedPlaylistSubject$ = new BehaviorSubject<number>(this._lastDeletedPlaylistId);
  playlistDeleted$ = this._deletedPlaylistSubject$.asObservable();

  addPlaylist(playlist: Playlist) {
    this.lastPlaylist = playlist;
    this._playlistSubject$.next(playlist);
  }

  deletePlaylist(id: number) {
    this._lastDeletedPlaylistId = id;
    this._deletedPlaylistSubject$.next(id);
  }
}

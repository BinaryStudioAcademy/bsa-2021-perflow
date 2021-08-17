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
  private _playlistSubject$ = new BehaviorSubject<Playlist | null>(this.lastPlaylist);
  playlistChanged$ = this._playlistSubject$.asObservable();

  addPlaylist(playlist: Playlist) {
    this.lastPlaylist = playlist;
    this._playlistSubject$.next(playlist);
  }
}

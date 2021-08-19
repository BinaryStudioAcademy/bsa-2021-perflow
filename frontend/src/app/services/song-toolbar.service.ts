import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SongInfo } from '../models/song/song-info';

@Injectable({
  providedIn: 'root'
})
export class SongToolbarService {
  private _songUpdatedSource = new Subject<SongInfo>();
  private _playToggledSource = new Subject<void>();

  songUpdated$ = this._songUpdatedSource.asObservable();
  playToggled$ = this._playToggledSource.asObservable();

  updateSong(song: SongInfo) {
    this._songUpdatedSource.next(song);
  }

  togglePlay = () => {
    this._playToggledSource.next();
  };

  isInitialized = () => {

  };
}

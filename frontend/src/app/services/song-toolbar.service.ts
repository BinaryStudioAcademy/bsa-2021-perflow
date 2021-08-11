import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SongInfo } from '../models/song/song-info';

@Injectable({
  providedIn: 'root'
})
export class SongToolbarService {
  private _songUpdatedSource = new Subject<SongInfo>();

  songUpdated$ = this._songUpdatedSource.asObservable();

  updateSong(song: SongInfo) {
    this._songUpdatedSource.next(song);
  }
}

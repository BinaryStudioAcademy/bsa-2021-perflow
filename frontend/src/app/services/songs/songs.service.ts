import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Song } from 'src/app/models/song/song';
import { HttpInternalService } from '../http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  topSongs: Song[] = [];

  constructor(
    private _httpService: HttpInternalService
  ) { }

  public getLikedSongs() {
    return this._httpService.getRequest<Song[]>('/api/songs/liked');
  }

  public getTopSongs(): Observable<Song[]> {
    return of(this.topSongs);
  }
}

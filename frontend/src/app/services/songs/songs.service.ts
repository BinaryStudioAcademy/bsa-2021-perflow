import { Injectable } from '@angular/core';
import { Song } from 'src/app/models/shared/song.model';
import { HttpInternalService } from '../http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  constructor(
    private _httpService: HttpInternalService
  ) { }

  public getLikedSongs() {
    return this._httpService.getRequest<Song[]>('/api/songs/liked');
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from 'src/app/models/song/song';
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

  getSongsByName = (searchTerm: string): Observable<Song[]> => {
    const httpParams = { searchTerm: `${searchTerm}` };
    return this._httpService.getRequest<Song[]>('/api/songs/search', httpParams);
  };
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/models/playlist/playlist';
import { HttpInternalService } from '../http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {
  private readonly _endpoint: string = '/api/Playlists';
  constructor(private _httpService: HttpInternalService) { }

  savePlaylist = (playlist: Playlist): Observable<Playlist> => {
    const response = this._httpService.postRequest<Playlist>(this._endpoint, playlist);
    return response;
  };

  editPlaylist = (playlist: Playlist): Observable<Playlist> => {
    const response = this._httpService.putRequest<Playlist>(this._endpoint, playlist);
    return response;
  };
}

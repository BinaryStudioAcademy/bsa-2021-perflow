import { Injectable } from '@angular/core';
import { Playlist } from '../models/playlist';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistServiceService {
  private _routePrefix = '/api/playlists';

  constructor(private _httpService: HttpInternalService) { }

  public getAllPlaylists() {
    return this._httpService.getRequest<Playlist[]>(`${this._routePrefix}`);
  }

  public getLikedPlaylistsByTheUser(userId: number) {
    return this._httpService.getRequest<Playlist[]>(`${this._routePrefix}/liked/${userId}`);
  }
}

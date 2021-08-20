import { Injectable } from '@angular/core';
import { RecentlyPlayed } from '../models/recently-played/recently-played';
import { RPViaSongIdInfo } from '../models/recently-played/rp-via-song-id-info';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class RecentlyPlayedService {
  public routePrefix = '/api/RecentlyPlayed';

  constructor(private _httpService: HttpInternalService) { }

  getAll(userId: number) {
    const httpParams = { userId };
    return this._httpService.getRequest<RecentlyPlayed>(`${this.routePrefix}/get/all`, httpParams);
  }

  getRecent(userId: number, amount: number) {
    const httpParams = { userId };
    return this._httpService.getRequest<RecentlyPlayed>(`${this.routePrefix}/get/recent/${amount}`, httpParams);
  }

  addSong(rpInfo: RecentlyPlayed) {
    return this._httpService.postRequest<RecentlyPlayed>(`${this.routePrefix}/add`, rpInfo);
  }

  addSongViaId(songId: number, userId: number, playlistId?: number) {
    const songInfo: RPViaSongIdInfo = {userId, playlistId};
    return this._httpService.postRequest<RecentlyPlayed>(`${this.routePrefix}/add/${songId}`, songInfo);
  }
}

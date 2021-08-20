import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecentlyPlayedSong } from '../models/recently-played/recent-song';
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
    const info: RPViaSongIdInfo = { userId, playlistId };
    return this._httpService.postRequest<RPViaSongIdInfo>(`${this.routePrefix}/add/${songId}`, info);
  }

  getRecentSongs(userId: number, amount: number): Observable<RecentlyPlayedSong[]> {
    const httpParams = { userId };
    return this._httpService.getRequest<RecentlyPlayedSong[]>(
      `${this.routePrefix}/get/recent/songs/${amount}`, httpParams
    );
  }
}

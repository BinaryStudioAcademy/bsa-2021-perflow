import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ContentSyncRead } from '../models/content-synchronization/content-sync-read';
import { ContentSyncWrite } from '../models/content-synchronization/content-sync-write';
import { SongInfo } from '../models/song/song-info';
import { AuthService } from './auth/auth.service';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class ContentSynchronizationService {
  private readonly _routePrefix = '/api/ContentSynchronization';

  private _sInfo = {
    songId: 0,
    userId: 0,
    time: 0
  } as ContentSyncWrite;

  song$ = new Subject<SongInfo>();

  constructor(
    private _httpServices: HttpInternalService,
    private _authService: AuthService
  ) {
    this._authService.getAuthStateObservable()
      .pipe(take(1))
      .subscribe(
        (state) => {
          this._sInfo.userId = state!.id;
        }
      );

    this.song$.subscribe({
      next: (song) => {
        this._sInfo.songId = song.id;
      }
    });
  }

  writeSynchronizationInfo(time: number) {
    this._sInfo.time = time;

    this.writeContentSyncAsync(this._sInfo)
      .pipe(take(1))
      .subscribe();
  }

  writeContentSyncAsync(contentSync: ContentSyncWrite) {
    return this._httpServices.postRequest(this._routePrefix, contentSync);
  }

  getContentSyncAsync(userId: number): Observable<ContentSyncRead> {
    return this._httpServices.getRequest<ContentSyncRead>(`${this._routePrefix}/${userId}`);
  }
}

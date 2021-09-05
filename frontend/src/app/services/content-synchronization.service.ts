import { Injectable } from '@angular/core';
import { ContentSyncWrite } from '../models/content-synchronization/content-sync-write';
import { HttpInternalService } from './http-internal.service';
import { SongToolbarService } from './song-toolbar.service';
import { ContentSyncHubService } from './hubs/content-sync-hub.service';

@Injectable({
  providedIn: 'root'
})
export class ContentSynchronizationService {
  constructor(
    private _httpService: HttpInternalService,
    private _hub: ContentSyncHubService,
    private _toolbarService: SongToolbarService
  ) {}

  get syncData$() {
    return this._hub.syncData$;
  }

  async writeSynchronizationInfo(time: number) {
    const currentSong = this._toolbarService.getCurrentSong();

    if (!currentSong) {
      return;
    }

    const syncData: ContentSyncWrite = {
      songId: currentSong.id,
      time
    };

    await this._hub.sendSyncData(syncData);
  }
}

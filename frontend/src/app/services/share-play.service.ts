import { Injectable } from '@angular/core';
import { SharePlay } from '../models/share-play/share-play';
import { SharePlayData } from '../models/share-play/share-play-data';
import { HttpInternalService } from './http-internal.service';
import { SharePlayHub } from './hubs/share-play-hub';
import { SongToolbarService } from './song-toolbar.service';

@Injectable({
  providedIn: 'root'
})
export class SharePlayService {
  private readonly _routePrefix = '/api/SharePlay';
  private _playlistId: number;

  constructor(
    private _httpService: HttpInternalService,
    private _hub: SharePlayHub,
    private _toolbarService: SongToolbarService
  ) {
  }

  sharePlayAsync(data: SharePlay) {
    this._playlistId = data.playlistId;
    return this._httpService.postRequest(this._routePrefix, data);
  }

  getSharePlayState(playlistId: number) {
    return this._httpService.getRequest<boolean>(`${this._routePrefix}/${playlistId}`);
  }

  async connectToSharePlay(id: number) {
    this._playlistId = id;
    await this._hub.connectToHub({ masterId: 0, playlistId: id });
  }

  get syncData$() {
    return this._hub.syncData$;
  }

  async sendSynchronizationInfo(time: number, _isPlaying: boolean = false) {
    const currentSong = this._toolbarService.getCurrentSong();

    if (!currentSong) {
      return;
    }

    const syncData: SharePlayData = {
      songId: currentSong.id,
      playlistId: this._playlistId,
      time,
      isPlaying: _isPlaying
    };

    await this._hub.sendSyncData(syncData);
  }

  async disconectHub() {
    await this._hub.stop();
  }
}

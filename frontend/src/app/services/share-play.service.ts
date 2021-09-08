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

  getSharePlayState(playlistId: number) {
    return this._httpService.getRequest<boolean>(`${this._routePrefix}/${playlistId}`);
  }

  async connectToSharePlay(sp: SharePlay) {
    this._playlistId = sp.playlistId;
    await this._hub.connectToHub(sp);
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

  getHubStatus() {
    return this._hub?.getHubStatus();
  }

  async disconectHub(data: SharePlay) {
    await this._hub.disconect(data);
    // await this._hub.stop();
  }
}

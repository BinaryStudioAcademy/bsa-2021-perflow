import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CheckStatus } from '../models/share-play/check-status';
import { SharePlay } from '../models/share-play/share-play';
import { SharePlayData } from '../models/share-play/share-play-data';
import { SharePlayHub } from './hubs/share-play-hub';
import { SongToolbarService } from './song-toolbar.service';

@Injectable({
  providedIn: 'root'
})
export class SharePlayService {
  private _playlistId: number;
  checkConnectionStatus$ = new Subject<CheckStatus>();

  constructor(
    private _hub: SharePlayHub,
    private _toolbarService: SongToolbarService
  ) {
    this._hub.checkStatus$.subscribe(this.checkConnectionStatus$);
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

  checkUserStatus(data: SharePlay) {
    this._hub.checkUserStatus(data);
  }

  async disconectHub(data: SharePlay) {
    await this._hub.disconect(data);
  }
}

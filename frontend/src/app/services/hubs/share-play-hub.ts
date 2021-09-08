/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SharePlay } from 'src/app/models/share-play/share-play';
import { SharePlayData } from 'src/app/models/share-play/share-play-data';
import { HubConnectionState } from '@microsoft/signalr';
import { BaseHubService } from './base-hub.service';
import { HubFactoryService } from './hub-factory.service';
import { SnackbarService } from '../snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class SharePlayHub extends BaseHubService {
  protected readonly hubUrl = 'share-play';

  syncData$ = new Subject<SharePlayData>();

  constructor(
    hubFactory: HubFactoryService,
    snackbarService: SnackbarService
  ) {
    super(hubFactory, snackbarService);
    this.start();
  }

  protected onStart() {
    this.hubConnection.on(
      'ResendSynchronization',
      (syncData: SharePlayData) => {
        this.syncData$.next(syncData);
      }
    );
  }

  getHubStatus() {
    return this.hubConnection?.state;
  }

  sendSyncData(syncData: SharePlayData) {
    if (this.hubConnection.state === HubConnectionState.Connected) {
      this.hubConnection.invoke('SendSynchronization', syncData);
    }
  }

  connectToHub(data: SharePlay) {
    return this.hubConnection.invoke('Connect', data);
  }
}

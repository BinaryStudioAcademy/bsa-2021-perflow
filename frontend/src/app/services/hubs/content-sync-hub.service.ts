/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BaseHubService } from './base-hub.service';
import { HubFactoryService } from './hub-factory.service';
import { SnackbarService } from '../snackbar.service';
import { ContentSyncRead } from '../../models/content-synchronization/content-sync-read';
import { ContentSyncWrite } from '../../models/content-synchronization/content-sync-write';

@Injectable({
  providedIn: 'root'
})
export class ContentSyncHubService extends BaseHubService {
  protected readonly hubUrl = 'content-sync';

  syncData$ = new Subject<ContentSyncRead>();

  constructor(
    hubFactory: HubFactoryService,
    snackbarService: SnackbarService
  ) {
    super(hubFactory, snackbarService);
    this.start();
  }

  protected onStart() {
    this.hubConnection.on(
      'ReceiveSynchronization',
      (syncData: ContentSyncRead) => this.syncData$.next(syncData)
    );
  }

  sendSyncData(syncData: ContentSyncWrite) {
    return this.hubConnection.invoke('SendSynchronization', syncData);
  }
}

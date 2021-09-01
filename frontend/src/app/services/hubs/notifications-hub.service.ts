/* eslint-disable no-console */

import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Notification } from 'src/app/models/notification/notification';
import { SnackbarService } from '../snackbar.service';
import { HubFactoryService } from './hub-factory.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsHubService {
  private _unsubscribe$ = new Subject<void>();

  private readonly _hubUrl = 'notifications';
  private _hubConnection: HubConnection;

  readonly notifications = new Subject<Notification>();

  constructor(
    private _hubFactory: HubFactoryService,
    private _snackbarService: SnackbarService
  ) { }

  start() {
    console.log('start: start createHub');
    this._hubFactory.createHub(this._hubUrl)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(async (hc) => {
        this._hubConnection = hc!;

        await this.init();
      });
  }

  async init() {
    console.log('init: start hub');
    await this._hubConnection
      .start()
      .catch((error) => {
        this._snackbarService.show({ type: 'error', header: 'Error occured!', message: error });
      });

    this._hubConnection.on('SendNotification', (n: Notification) => {
      console.log(n);
      this.notifications.next(n);
    });
  }

  async stop() {
    await this._hubConnection.stop();
    this._unsubscribe$.next();
  }
}

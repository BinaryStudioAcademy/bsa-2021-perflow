/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from 'src/app/models/notification/notification';
import { BaseHubService } from './base-hub.service';
import { HubFactoryService } from './hub-factory.service';
import { SnackbarService } from '../snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsHubService extends BaseHubService {
  readonly notifications = new Subject<Notification>();

  protected readonly hubUrl = 'hub/notifications';

  constructor(
    hubFactory: HubFactoryService,
    snackbarService: SnackbarService
  ) {
    super(hubFactory, snackbarService);
  }

  protected onStart(): void | Promise<void> {
    this.hubConnection.on('SendNotification', (n: Notification) => {
      this.notifications.next(n);
    });
  }
}

import { Injectable } from '@angular/core';
import { HubConnection } from '@microsoft/signalr';
import { HubFactoryService } from './hub-factory.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsHubService {
  private readonly _hubUrl = 'notifications';
  private _hubConnection: HubConnection;

  constructor(private _hubFactory: HubFactoryService) { }

  start() {
    this._hubConnection = this._hubFactory.createHub(this._hubUrl)!;
    this._hubConnection.start();
  }
}

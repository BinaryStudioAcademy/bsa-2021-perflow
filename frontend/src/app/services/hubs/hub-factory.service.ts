import { Injectable } from '@angular/core';
import {
  HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel
} from '@microsoft/signalr';
import { of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HubFactoryService {
  private _hubs = new Map<string, HubConnection>();
  baseUrl: string = environment.apiUrl;
  defaultTimeoutInMilliseconds = 180000; // 3 minutes

  constructor(private _authService: AuthService) { }

  createHub(hubName: string) {
    if (this._hubs.has(hubName)) {
      return of(this._hubs.get(hubName));
    }

    return this._authService.getCurrentTokenObservable()
      .pipe(filter((token) => !!token),
        map((token) => {
          const hub = this._buildHub(hubName, token!);
          this._hubs.set(hubName, hub);
          return hub;
        }));
  }

  private _buildHub(hubUrl: string, token: string) {
    const connection = new HubConnectionBuilder()
      .withUrl(this._buildUrl(hubUrl), {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    connection.keepAliveIntervalInMilliseconds = this.defaultTimeoutInMilliseconds;
    connection.serverTimeoutInMilliseconds = this.defaultTimeoutInMilliseconds;

    return connection;
  }

  private _buildUrl(hubUrl: string) {
    if (hubUrl.startsWith('http://') || hubUrl.startsWith('https://')) {
      return hubUrl;
    }
    return `${this.baseUrl}/${hubUrl}`;
  }
}

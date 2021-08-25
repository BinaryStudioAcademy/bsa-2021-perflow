import { Injectable } from '@angular/core';
import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HubFactoryService {
  private _hubs = new Map<string, HubConnection>();
  baseUrl: string = environment.apiUrl;

  createHub(hubName: string) {
    if (this._hubs.has(hubName)) {
      return this._hubs.get(hubName);
    }

    const hub = this._buildHub(hubName);
    this._hubs.set(hubName, hub);

    return hub;
  }

  private _buildHub(hubUrl: string) {
    return new HubConnectionBuilder()
      .withUrl(this._buildUrl(hubUrl), {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .configureLogging(LogLevel.Information)
      .build();
  }

  private _buildUrl(hubUrl: string) {
    if (hubUrl.startsWith('http://') || hubUrl.startsWith('https://')) {
      return hubUrl;
    }
    return `${this.baseUrl}/${hubUrl}`;
  }
}

import { Injectable } from '@angular/core';
import { Notification } from '../models/notification/notification';
import { HttpInternalService } from './http-internal.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  routePrefix = '/api/Notifications';

  constructor(private _httpService: HttpInternalService) { }

  getAll() {
    return this._httpService.getRequest<Notification[]>(this.routePrefix);
  }

  markAllAsRead() {
    return this._httpService.postRequest(this.routePrefix, {});
  }
}

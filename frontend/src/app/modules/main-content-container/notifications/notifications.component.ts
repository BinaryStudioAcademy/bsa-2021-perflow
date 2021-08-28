/*eslint no-param-reassign: "error"*/
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'jquery';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationType } from 'src/app/models/enums/notification-type';
import { Notification } from 'src/app/models/notification/notification';
import { NotificationsHubService } from 'src/app/services/hubs/notifications-hub.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  private _unsubscribe$ = new Subject<void>();

  notificationType = NotificationType;
  notifications: Notification[] = [];
  isAnyNewNotification: boolean = false;

  constructor(
    private _notificationsHub: NotificationsHubService,
    private _notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.getAllNotifications();

    this.subscribeToNotifications();
  }

  getAllNotifications() {
    this._notificationService.getAll()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((notifications) => {
        this.notifications = notifications;

        this.isAnyNewNotification = this.notifications.some((n) => !n.isRead);
      });
  }

  markAllAsRead() {
    this._notificationService.markAllAsRead()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        map(this.notifications, (n) => {
          n.isRead = true;
        });

        this.isAnyNewNotification = false;
      });
  }

  subscribeToNotifications() {
    this._notificationsHub.start();

    this._notificationsHub.notifications
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((n) => {
        this.notifications.unshift(n);

        this.isAnyNewNotification = true;
      });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._notificationsHub.stop();
  }
}

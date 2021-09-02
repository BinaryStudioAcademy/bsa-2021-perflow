/* eslint no-param-reassign: "error" */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'jquery';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationType } from 'src/app/models/enums/notification-type';
import { Notification } from 'src/app/models/notification/notification';
import { NotificationsHubService } from 'src/app/services/hubs/notifications-hub.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

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
    private _notificationService: NotificationService,
    private _snackbarService: SnackbarService,
    private _router: Router
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

  changeState(notification: Notification, isRead: boolean) {
    this._notificationService.changeState({ id: notification.id, isRead })
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        this.notifications.find((n) => n.id === notification.id)!.isRead = isRead;
      });
  }

  deleteNotification(id: number) {
    this._notificationService.delete(id)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        const index = this.notifications.findIndex((n) => n.id === id);
        this.notifications.splice(index, 1);
      }, (e: Error) => {
        this._snackbarService.show({ type: 'error', header: 'Error occured!', message: e.message });
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

  navigateViaLink(type: string, notif: Notification) {
    switch (type) {
      case 'album':
        this._router.navigateByUrl(`/albums/${notif.reference}`);
        break;
      case 'playlist':
        this._router.navigateByUrl(`/playlists/view-playlist/${notif.reference}`);
        break;
      default:
        break;
    }
  }

  displayLink = (notif: Notification) => {
    return notif.type === NotificationType.artistSubscribtion
    || notif.type === NotificationType.groupSubscribtion
    || notif.type === NotificationType.collaborativePlaylistSubscription;
  }
}

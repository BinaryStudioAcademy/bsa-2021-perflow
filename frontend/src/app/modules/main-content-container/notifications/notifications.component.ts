import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent {
  private _userId: number;
  private _unsubscribe$ = new Subject<void>();

  notifications: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(
    private _authService: AuthService,
  ) {
    this.getUserId();
  }

  getUserId() {
    this._authService.getAuthStateObservableFirst()
      .pipe(
        filter((state) => !!state),
        takeUntil(this._unsubscribe$))
      .subscribe(
        (state) => {
          this._userId = state!.id;
        }
      );
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
  }
}
import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { UserRoles } from 'src/app/models/enums/user-roles.enum';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-left-side-menu',
  templateUrl: './left-side-menu.component.html',
  styleUrls: ['./left-side-menu.component.sass']
})
export class LeftSideMenuComponent implements OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  userRole: UserRoles;
  userRoles = UserRoles;

  constructor(private _authService: AuthService) {
    this.getUserRole();
  }

  getUserRole() {
    this._authService.getAuthStateObservable()
      .pipe(
        takeUntil(this._unsubscribe$),
        filter((state) => !!state))
      .subscribe((state) => {
        this.userRole = state!.role;
      });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
  }
}

import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { UserRoles } from 'src/app/models/enums/user-roles.enum';
import { Group } from 'src/app/models/group/group';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-left-side-menu',
  templateUrl: './left-side-menu.component.html',
  styleUrls: ['./left-side-menu.component.sass']
})
export class LeftSideMenuComponent implements OnDestroy {
  private _unsubscribe$ = new Subject<void>();
  userRole: UserRoles;
  userRoles = UserRoles;
  artistGroups: Group[] = [];

  constructor(
    private _authService: AuthService,
    private _groupService: GroupService
  ) {
    this.getUserRole();
    this.getUserGroups();
  }

  getUserRole() {
    this._authService.getAuthStateObservable()
      .pipe(
        takeUntil(this._unsubscribe$),
        filter((state) => !!state)
      )
      .subscribe((state) => {
        this.userRole = state!.role;
      });
  }

  getUserGroups() {
    this._groupService.getUserGroups()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (resp) => {
          this.artistGroups = resp.body!;
          console.log(resp);
        }
      );
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
  }
}

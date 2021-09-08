import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { ProfileService } from 'src/app/services/profile.service';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UserRoles } from '../../../models/enums/user-roles.enum';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.sass']
})
export class ProfileMenuComponent implements OnInit, OnDestroy {
  userName: string = 'user';
  userIconURL: string = '';
  isRightRole: boolean = false;
  currentRoute: string;

  private _userId: number;
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _profileService: ProfileService,
    private _router: Router
  ) {
    this._authService.getAuthStateObservableFirst()
      .pipe(filter((state) => state !== null))
      .subscribe((authState) => {
        this.userName = authState!.userName;
        this._userId = authState!.id;
        this.getUserIconURL();

        const { role } = authState!;
        this.isRightRole = role === UserRoles.artist || role === UserRoles.moderator;
        this._router.events.pipe(
          filter((event) => event instanceof NavigationEnd)
        )
          .subscribe((event) => {
            const route = event as NavigationEnd;
            this.currentRoute = route.url;
          });
      });
  }

  ngOnInit() {
    this.updateUserName();
  }

  getUserIconURL() {
    this._userService.getUserImage(this._userId)
      .subscribe({
        next: (response) => {
          this.userIconURL = response.imageUrl;
        }
      });

    this._profileService.profileIconUpdated$
      .subscribe(
        (icon) => {
          this.userIconURL = icon;
        }
      );
  }

  updateUserName() {
    this._profileService.profileNameUpdated$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (name) => {
          this.userName = name;
        }
      );
  }

  logout() {
    this._authService.signOut();
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}

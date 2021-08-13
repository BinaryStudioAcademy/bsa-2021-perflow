import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../../services/auth/auth.service';
import { UserRoles } from '../../../models/enums/user-roles.enum';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.sass']
})
export class ProfileMenuComponent {
  isProfileMenuShown: boolean = false;

  userName: string = 'user';
  userIconURL: string = '';
  isRightRole: boolean = false;

  private _userId: number;

  constructor(
    private _authService: AuthService,
    private _userService: UserService
  ) {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => state !== null))
      .subscribe((authState) => {
        this.userName = authState!.userName;
        this._userId = authState!.id;

        this.getUserIconURL();

        const { role } = authState!;
        this.isRightRole = role === UserRoles.artist || role === UserRoles.moderator;
      });
  }

  getUserIconURL() {
    this._userService.getUser(this._userId)
      .subscribe({
        next: (user) => {
          this.userIconURL = user.iconURL;
        }
      });
  }

  logout() {
    this._authService.signOut();
  }

  onClickOutsideProfileMenu = (event: Event) => {
    this.isProfileMenuShown = false;
  };

  showProfileMenu = () => {
    this.isProfileMenuShown = !this.isProfileMenuShown;
  };
}

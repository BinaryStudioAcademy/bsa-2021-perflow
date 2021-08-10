import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
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

  // Determines if the menu item 'Perflow Studio' will be shown in Profile menu
  // 'Perflow Studio' - available only for artists and moderators
  isRightRole: boolean = false;

  constructor(
    private _authService: AuthService
  ) {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => state !== null))
      .subscribe((authState) => {
        this.userName = authState!.userName;

        const { role } = authState!;
        this.isRightRole = role === UserRoles.artist || role === UserRoles.moderator;
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

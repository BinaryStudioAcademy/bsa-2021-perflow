import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.sass']
})
export class ProfileMenuComponent {
  public isProfileMenuShown: boolean = false;

  constructor(
    private _authService: AuthService
  ) {}

  logout() {
    this._authService.signOut();
  }

  onClickOutsideProfileMenu = (event: Event) => {
    this.isProfileMenuShown = false;
  };

  showProfileMenu = () => {
    this.isProfileMenuShown = !this.isProfileMenuShown;
  };

  // Determines if the menu item 'Perflow Studio' will be shown in Profile menu
  // 'Perflow Studio' - available only for artists and moderators
  isRightRole = (): boolean => false;
}

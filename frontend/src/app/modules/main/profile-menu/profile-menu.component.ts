import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.sass']
})
export class ProfileMenuComponent {
  public isProfileMenuShown: boolean = false;

  logout = () => {
  };

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

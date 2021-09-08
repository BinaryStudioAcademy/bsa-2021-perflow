import { Component, OnInit } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user/user';
import { UserChangePassword } from 'src/app/models/user/user-change-password';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.sass']
})
export class UserProfileEditComponent implements OnInit {
  user: User;
  updatedUser: User;
  updatedUserPassword: UserChangePassword;

  constructor(
    private _userService: UserService,
    private _authService: AuthService,
    private _snackbarService: SnackbarService,
    private _profileService: ProfileService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this._authService.getAuthStateObservable()
      .pipe(
        filter((state) => !!state),
        switchMap((state) => this._userService.getUser(state!.id))
      )
      .subscribe((result) => {
        this.user = result;
      });
  }

  onSubmitUser(updatedUser: User) {
    this.updatedUser = updatedUser;

    this._userService.updateUser(updatedUser)
      .subscribe(() => {
        this._snackbarService.show({ message: 'Changed successfully!' });
        this._profileService.updateProfileName(updatedUser.userName);
      },
      (e) => {
        this._snackbarService.show({ message: e.statusText, header: 'Error', type: 'error' });
      });
  }

  onSubmitPassword(updatedUserPassword: UserChangePassword) {
    this.updatedUserPassword = updatedUserPassword;

    this._userService.updateUserPassword(updatedUserPassword)
      .subscribe(() => {
        this._snackbarService.show({ message: 'Changed successfully!' });
      },
      (e) => {
        this._snackbarService.show({ message: e.statusText, header: 'Error', type: 'error' });
      });
  }
}

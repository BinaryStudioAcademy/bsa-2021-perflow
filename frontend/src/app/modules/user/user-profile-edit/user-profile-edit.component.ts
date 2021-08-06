import { Component, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/models/user/user';
import { UserChangePassword } from 'src/app/models/user/user-change-password';
import { UserService } from 'src/app/services/user.service';
import { UpdatePasswordFormComponent } from '../update-password-form/update-password-form.component';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.sass']
})
export class UserProfileEditComponent {
  @ViewChild(UpdatePasswordFormComponent, { static: false })
  private _updatePasswordFormComponent: UpdatePasswordFormComponent | undefined;
  updatedUser: User;
  updatedUserPassword: UserChangePassword;
  isSuccess: boolean = false;
  isError: boolean = false;

  constructor(private _userService: UserService) { }

  onSubmitUser(updatedUser: User) {
    this.updatedUser = updatedUser;
    this._userService.updateUser(updatedUser)
      .subscribe(() => {
        this.isSuccess = true;
      },
      () => {
        this.isError = true;
      });
  }

  onSubmitPassword(updatedUserPassword: UserChangePassword) {
    this.updatedUserPassword = updatedUserPassword;
    this._userService.updateUserPassword(updatedUserPassword)
      .pipe(
        finalize(() => {
          this._updatePasswordFormComponent?.reset();
        })
      )
      .subscribe(() => {
        this.isSuccess = true;
      },
      () => {
        this.isError = true;
      });
  }
}

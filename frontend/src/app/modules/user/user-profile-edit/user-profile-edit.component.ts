import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';
import { UserChangePassword } from 'src/app/models/user/user-change-password';
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
  isSuccess: boolean = false;
  isError: boolean = false;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    // TODO: get user from authService
    this.user = {
      id: 1,
      email: 'some@gmail.com',
      iconURL: '',
      gender: true,
      userName: 'someName',
      description: 'someText',
      birthday: new Date(),
      country: 'Ukraine'
    };
  }

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
      .subscribe(() => {
        this.isSuccess = true;
      },
      () => {
        this.isError = true;
      });
  }
}

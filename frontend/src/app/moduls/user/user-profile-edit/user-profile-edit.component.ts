import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/shared/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.sass']
})
export class UserProfileEditComponent implements OnInit {
  updatedUser: User;
  isSuccess: boolean = false;
  isError: boolean = false;

  constructor(private userService: UserService) { }

  onSubmit(updatedUser: User) {
    console.log(updatedUser);
    this.updatedUser = updatedUser;
    this.userService.updateUser(updatedUser)
      .subscribe(() => this.isSuccess = true,
                 () => this.isError = true);
  }

  ngOnInit(): void {
  }

}

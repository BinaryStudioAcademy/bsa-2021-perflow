import { Component, Input } from '@angular/core';
import { UserRegisterDto } from 'src/app/models/auth/user-register-dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-registration-page',
  templateUrl: './user-registration-page.component.html',
  styleUrls: ['./user-registration-page.component.sass']
})
export class UserRegistrationPageComponent {
  isSuccess: boolean = false;
  @Input() isRequiredError: boolean = false;
  newUser!: UserRegisterDto;
  constructor(private _userService: UserService) { }

  onSubmit(newUser: UserRegisterDto): void {
    this.newUser = newUser;
    this._userService.createUser(newUser); // to implement on backend
    this.isSuccess = true;
  }
}

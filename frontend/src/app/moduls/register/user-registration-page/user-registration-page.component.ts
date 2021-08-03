import { Component, Input } from '@angular/core';
import { UserRegister } from 'src/app/models/auth/user-register';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-registration-page',
  templateUrl: './user-registration-page.component.html',
  styleUrls: ['./user-registration-page.component.sass']
})
export class UserRegistrationPageComponent {
  isSuccess: boolean = false;
  newUser!: UserRegister;

  @Input() 
    isRequiredError: boolean = false;
  
  constructor(private _userService: UserService) { }

  onSubmit(newUser: UserRegister) {
    this.newUser = newUser;
    this._userService.createUser(newUser); // to implement on backend
    this.isSuccess = true;
  }
}

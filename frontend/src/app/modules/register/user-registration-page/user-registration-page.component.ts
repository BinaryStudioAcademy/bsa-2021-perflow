import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { RegisterData } from '../../../models/auth/register-data';

@Component({
  selector: 'app-user-registration-page',
  templateUrl: './user-registration-page.component.html',
  styleUrls: ['./user-registration-page.component.sass']
})
export class UserRegistrationPageComponent {
  isSuccess: boolean = false;

  @Input()
  isRequiredError: boolean = false;

  constructor(
    private _authService: AuthService
  ) { }

  async onSubmit(newUser: RegisterData) {
    await this._authService.registerWithEmail({ registerData: newUser, redirect: '/' });
    this.isSuccess = true;
  }
}

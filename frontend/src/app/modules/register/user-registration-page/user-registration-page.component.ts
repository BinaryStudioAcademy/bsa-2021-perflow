import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { RegisterData } from '../../../models/auth/register-data';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-user-registration-page',
  templateUrl: './user-registration-page.component.html',
  styleUrls: ['./user-registration-page.component.sass']
})
export class UserRegistrationPageComponent {

  @Input()
  isRequiredError: boolean = false;

  constructor(
    private _authService: AuthService,
    private _snackbarService: SnackbarService
  ) { }

  async onSubmit(newUser: RegisterData) {
    await this._authService.registerWithEmail({ registerData: newUser, redirect: '/' });

    this._snackbarService.show({ 
      message: 'You may now log-in with your email and password.', 
      header: 'Registration successful!'
    });
  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent {
  showPassword: boolean = false;
  isLogInClicked: boolean = false;
  rememberMe: boolean = true;
  loading: boolean = false;
  failure: boolean = false;
  failMessage: string = '';

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^[a-zA-Z0-9@._-]*$')
    ])
  });

  constructor(
    private _authService: AuthService,
    private _snackbarService: SnackbarService
  ) {
    this.loginForm.valueChanges.subscribe((changes) => {
      this.isLogInClicked = false;
    });
  }

  logInWithEmail() {
    if (!this.loginForm.valid) {
      return;
    }
    this.failure = false;
    this.isLogInClicked = true;
    this.loginForm.markAsPristine();

    const { email, password } = this.loginForm.value;
    this._authService.signInWithEmail({
      email,
      password,
      remember: this.rememberMe,
      redirect: '/'
    })
      .catch((e) => {
        this.isLogInClicked = false;

        this._snackbarService.show({ message: e, header: 'Login Failed!', type: 'error' });
      });
  }

  logInWithGoogle() {
    this._authService.signInWithGoogle({
      remember: this.rememberMe,
      redirect: '/'
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}

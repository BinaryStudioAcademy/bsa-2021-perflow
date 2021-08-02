import {
  Component
} from '@angular/core';
import {
  FormControl, FormGroup, Validators
} from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent {
  showPassword: boolean = false;
  isLogInClicked: boolean = false;
  loginForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^[a-zA-Z0-9@._-]*$')
    ])
  });

  constructor() {
    this.loginForm.valueChanges.subscribe((changes) => {
      this.isLogInClicked = false;
    });
  }

  logInOnClick() {
    this.isLogInClicked = true;
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}

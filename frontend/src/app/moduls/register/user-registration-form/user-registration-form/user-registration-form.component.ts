import {
  Component, EventEmitter, OnInit, Output
} from '@angular/core';
import {
  AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators
} from '@angular/forms';
import { UserRegisterDto } from 'src/app/models/auth/user-register-dto';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.sass']
})
export class UserRegistrationFormComponent implements OnInit {
  public registrationForm!: FormGroup;
  @Output() isSuccess = new EventEmitter<boolean>();
  @Output() isRequiredError = new EventEmitter<boolean>();
  @Output() newUser = new EventEmitter<UserRegisterDto>();

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9@$!%*#?&-_])[A-Za-z0-9@$!%*#?&-_]{8,20}$')
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9@$!%*#?&-_])[A-Za-z0-9@$!%*#?&-_]{8,20}$')
      ]),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])
    }, { validators: this._checkPasswords });
  }
  get email() {
    return this.registrationForm.get('email')!;
  }

  get password() {
    return this.registrationForm.get('password')!;
  }

  get userName() {
    return this.registrationForm.get('userName')!;
  }

  get passwordConfirmation() {
    return this.registrationForm.get('passwordConfirmation')!;
  }

  public onSubmit(newUser: UserRegisterDto): void {
    this.isSuccess.emit(true);
    this.newUser.emit(newUser);
    this.registrationForm.reset();
  }

  public onValidate(): boolean {
    if (this.registrationForm.invalid
      && (
        this.registrationForm.controls.email.hasError('required')
        || this.registrationForm.controls.password.hasError('required')
        || this.registrationForm.controls.userName.hasError('required')
        || this.registrationForm.controls.passwordConfirmation.hasError('required')
      )) {
      this.isRequiredError.emit(true);
      return false;
    }
    return true;
  }

  private _checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password')!.value;
    const confirmPass = group.get('passwordConfirmation')!.value;
    return pass === confirmPass ? null : { notSame: true };
  };
}

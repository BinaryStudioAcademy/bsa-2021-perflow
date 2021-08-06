import {
  Component, EventEmitter, OnInit, Output
} from '@angular/core';
import {
  AbstractControl, FormControl, FormGroup, ValidatorFn, Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/shared/user.model';
import { UserChangePassword } from 'src/app/models/user/user-change-password';

@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.sass']
})
export class UpdatePasswordFormComponent implements OnInit {
  form!: FormGroup;
  user: User;

  @Output()
  updatedUserPassword = new EventEmitter<UserChangePassword>();

  constructor(private _router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      currentPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9@$!%*#?&-_])[A-Za-z0-9@$!%*#?&-_]{6,20}$')
      ]),
      newPasswordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*[0-9@$!%*#?&-_])[A-Za-z0-9@$!%*#?&-_]{6,20}$')
      ])
    }, { validators: this._checkPasswords });
  }

  get currentPassword() {
    return this.form.get('currentPassword')!;
  }

  get newPassword() {
    return this.form.get('newPassword')!;
  }

  get newPasswordConfirmation() {
    return this.form.get('newPasswordConfirmation')!;
  }

  redirect(route: string) {
    this._router.navigate([route]);
  }

  public reset() {
    this.form.reset();
  }

  public onSubmit() {
    const updatedUserPassword: UserChangePassword = {
      currentPassword: this.form.get('currentPassword')!.value,
      newPassword: this.form.get('newPassword')!.value,
      id: this.user.id
    };
    this.updatedUserPassword.emit(updatedUserPassword);
  }

  private _checkPasswords: ValidatorFn = (group: AbstractControl) => {
    const pass = group.get('newPassword')!.value;
    const confirmPass = group.get('newPasswordConfirmation')!.value;
    return pass === confirmPass ? null : { notSame: true };
  };
}

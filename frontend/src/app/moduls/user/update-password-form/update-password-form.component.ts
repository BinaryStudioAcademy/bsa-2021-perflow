import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/shared/user.model';

@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.sass']
})
export class UpdatePasswordFormComponent implements OnInit {
  public form!: FormGroup;

  user: User = { id: 1, userName: "someName", email: "some@gmail.com", description: "some", gender: true, country: "Albania", birthday: new Date(), password: "", iconURL: undefined };
  @Output()
  updatedUser = new EventEmitter<User>();

  constructor(private router: Router) { }

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
      ]),
    }, { validators: this.checkPasswords });
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
    this.router.navigate([route]);
  }

  public onSubmit(updatedUser: User) {
    this.updatedUser.emit(updatedUser);
  }

  private checkPasswords: ValidatorFn = (group: AbstractControl) => {
    const pass = group.get('newPassword')!.value;
    const confirmPass = group.get('newPasswordConfirmation')!.value;
    return pass === confirmPass ? null : { notSame: true };
  };
}

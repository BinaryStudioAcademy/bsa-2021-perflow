import {
  Component, EventEmitter, OnInit, Output, Input
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { UserChangePassword } from 'src/app/models/user/user-change-password';

@Component({
  selector: 'app-update-password-form',
  templateUrl: './update-password-form.component.html',
  styleUrls: ['./update-password-form.component.sass']
})
export class UpdatePasswordFormComponent implements OnInit {
  public userChangePassword: UserChangePassword;
  newPasswordConfirmation: string = '';

  @Input()
  user: User;

  @Output()
  updatedUserPassword = new EventEmitter<UserChangePassword>();

  constructor(private _router: Router) { }

  ngOnInit() {
    this.userChangePassword = { currentPassword: '', newPassword: '', id: this.user.id };
  }

  redirect(route: string) {
    this._router.navigate([route]);
  }

  public onSubmit(form: NgForm) {
    this.updatedUserPassword.emit(this.userChangePassword);
    form.reset();
  }
}

import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../../../models/shared/user.model';

@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.sass']
})
export class ProfileEditFormComponent implements OnInit {
  public form!: FormGroup;
  @Input() user: User = { id: 1, userName: "as", email: "q@gmail.com", description: "qqqqqq", gender: true, country: "UK", birthday: new Date(), password: "" };


  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      userName: new FormControl(this.user.userName, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.pattern('[A-Za-z0-9.-_]{6,20}')
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email
      ]),
      description: new FormControl(this.user.description, [
        Validators.required,
        Validators.maxLength(150)
      ]),
      gender: new FormControl(this.user.gender, Validators.required),
      birthday: new FormControl(this.user.birthday, Validators.required),
      country: new FormControl(this.user.country, Validators.required)
    });
  }

  get email() {
    return this.form.get('email')!;
  }

  get userName() {
    return this.form.get('userName')!;
  }

  get description() {
    return this.form.get('description')!;
  }
}

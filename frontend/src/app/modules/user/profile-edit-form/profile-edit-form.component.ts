import {
  Component, EventEmitter, OnInit, Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user/user';
import { countries } from '../data/countries';
import { Country } from '../models/country';

declare global {
  interface JQuery {
    modal(action: string): void;
  }
}

@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.sass']
})
export class ProfileEditFormComponent implements OnInit {
  form!: FormGroup;
  genders: { key: boolean; text: string; }[] = [{ key: false, text: 'Male' }, { key: true, text: 'Female' }];
  countries: Country[] = countries;
  standartIcon: string = '../../../../assets/images/standartIcon.png';
  user: User;

  @Output()
  updatedUser = new EventEmitter<User>();

  constructor(private _router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      userName: new FormControl(this.user.userName, [
        Validators.required,
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
      birthday: new FormControl(this.user.birthday),
      iconURL: new FormControl(this.user.iconURL),
      gender: new FormControl(this.user.gender),
      country: new FormControl(this.user.country)
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

  onSelect(event: Event) {
    const file = (<HTMLInputElement>event.target).files![0];

    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
      this.form.patchValue({ iconURL: file });
      this.form.get('iconURL')!.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.user.iconURL = reader.result!.toString();
      };
      reader.readAsDataURL(file);
    }
    else {
      $('.ui.modal').modal('show');
    }
  }

  redirect(route: string) {
    this._router.navigate([route]);
  }

  public onSubmit() {
    this.updatedUser.emit(this.user);
  }
}

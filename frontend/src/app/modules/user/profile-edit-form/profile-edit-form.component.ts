import {
  Component, EventEmitter, OnInit, Output, Input
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user/user';
import { countries } from '../data/countries';
import { genders } from '../data/genders';
import { Country } from '../models/country';
import { Gender } from '../models/gender';

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
  userForm!: FormGroup;
  genders: Gender[] = genders;
  countries: Country[] = countries;
  standartIcon: string = '../../../../assets/images/standartIcon.png';

  @Input()
  user: User;

  @Output()
  updatedUser = new EventEmitter<User>();

  constructor(private _router: Router) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      gender: new FormControl(this.user.gender),
      country: new FormControl(this.user.country)
    });
  }

  updateBirthday(event: Event) {
    this.user.birthday = new Date((<HTMLInputElement>event.target).value);
  }

  handleFileInput(event: Event) {
    const file: File = (<HTMLInputElement>event.target).files![0];

    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
      const reader: FileReader = new FileReader();
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

  onSubmit() {
    this.updatedUser.emit(this.user);
  }
}

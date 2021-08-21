import {
  Component, EventEmitter, OnInit, Output, Input
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
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
  validImageTypes: string[] = ['image/png', 'image/jpg', 'image/jpeg'];
  standartIcon: string = '../../../../assets/images/standartIcon.png';

  @Input()
  user: User;

  @Output()
  updatedUser = new EventEmitter<User>();

  constructor(
    private _profileService: ProfileService,
    private _userService: UserService
  ) { }

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

    if (this.validImageTypes.includes(file.type)) {
      this.updateUserIcon(file);
    }
    else {
      $('.ui.modal').modal('show');
    }
  }

  onSubmit() {
    this.updatedUser.emit(this.user);
  }

  updateUserIcon(file: File) {
    this._userService.updateUserIcon({ id: this.user.id, icon: file })
      .subscribe({
        next: (result) => {
          this.user.iconURL = result.uri;
          this._profileService.updateProfileIcon(this.user.iconURL);
        }
      });
  }
}

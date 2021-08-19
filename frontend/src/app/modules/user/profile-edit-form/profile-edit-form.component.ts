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

    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) {
      const reader: FileReader = new FileReader();
      reader.onload = () => {
        this.user.iconURL = reader.result!.toString();

        this.updateUserIcon();
      };
      reader.readAsDataURL(file);
    }
    else {
      $('.ui.modal').modal('show');
    }
  }

  onSubmit() {
    this.updatedUser.emit(this.user);
  }

  updateUserIcon() {
    this._userService.updateUserIcon({ id: this.user.id, iconURL: this.user.iconURL })
      .subscribe({
        next: () => {
          this._profileService.updateProfileIcon(this.user.iconURL);
        }
      });
  }
}

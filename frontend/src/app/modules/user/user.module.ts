import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ValidateEqualModule } from 'ng-validate-equal';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';

import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { ProfileEditFormComponent } from './profile-edit-form/profile-edit-form.component';
import { UpdatePasswordFormComponent } from './update-password-form/update-password-form.component';
import { UploadImageModalComponent } from './upload-image-modal/upload-image-modal.component';

@NgModule({
  declarations: [
    UserProfileEditComponent,
    ProfileEditFormComponent,
    UpdatePasswordFormComponent,
    UploadImageModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
    ValidateEqualModule
  ]
})

export class UserModule { }

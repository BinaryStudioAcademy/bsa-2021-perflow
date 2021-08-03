import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { ProfileEditFormComponent } from './profile-edit-form/profile-edit-form.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserProfileEditComponent,
    ProfileEditFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule
  ]
})
export class UserModule { }

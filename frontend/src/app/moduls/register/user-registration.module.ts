import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form/user-registration-form.component';
import { UserRegistrationPageComponent } from './user-registration-page/user-registration-page.component';
import { UserRegistrationRoutingModule } from './user-registration-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserRegistrationFormComponent,
    UserRegistrationPageComponent
  ],
  imports: [
    CommonModule,
    UserRegistrationRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserRegistrationModule { }

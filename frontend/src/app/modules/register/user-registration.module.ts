import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserRegistrationFormComponent }
  from './user-registration-form/user-registration-form/user-registration-form.component';
import { UserRegistrationPageComponent } from './user-registration-page/user-registration-page.component';
import { UserRegistrationRoutingModule } from './user-registration-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserRegistrationFormComponent,
    UserRegistrationPageComponent
  ],
  imports: [
    CommonModule,
    UserRegistrationRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [UserService]
})
export class UserRegistrationModule { }

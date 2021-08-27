import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherPageComponent } from './other-page/other-page/other-page.component';
import { LoginOtherRoutingModule } from './login-other-routing.module';

@NgModule({
  declarations: [
    OtherPageComponent
  ],
  imports: [
    CommonModule,
    LoginOtherRoutingModule
  ]
})
export class LoginOtherModule { }

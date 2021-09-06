import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OtherPageComponent } from './other-page/other-page/other-page.component';
import { LoginOtherRoutingModule } from './login-other-routing.module';
import { MainModule } from '../main/main.module';
import { SharedModule } from '../shared/shared.module';
import { GroupModalComponent } from './other-page/group-modal/group-modal.component';
import { ArtistApplicantPageComponent } from './other-page/artist-applicant-page/artist-applicant-page.component';

@NgModule({
  declarations: [
    OtherPageComponent,
    ArtistApplicantPageComponent,
    GroupModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginOtherRoutingModule,
    MainModule,
    SharedModule,
    InfiniteScrollModule,
    NgxSpinnerModule
  ],
  exports: [
    NgxSpinnerModule,
    InfiniteScrollModule,
    GroupModalComponent
  ]
})
export class LoginOtherModule { }

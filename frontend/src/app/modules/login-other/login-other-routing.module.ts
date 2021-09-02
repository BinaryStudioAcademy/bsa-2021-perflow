import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtherPageComponent } from './other-page/other-page/other-page.component';
import { ArtistApplicantPageComponent } from './other-page/artist-applicant-page/artist-applicant-page.component';

const routes: Routes = [
  { path: '', component: OtherPageComponent },
  { path: 'artistApplicant', component: ArtistApplicantPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginOtherRoutingModule { }

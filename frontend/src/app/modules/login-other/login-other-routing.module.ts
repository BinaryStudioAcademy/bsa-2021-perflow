import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtherPageComponent } from './other-page/other-page/other-page.component';

const routes: Routes = [{ path: '', component: OtherPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginOtherRoutingModule { }

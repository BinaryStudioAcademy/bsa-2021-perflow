import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationPageComponent } from './user-registration-page/user-registration-page.component';

const routes: Routes = [{ path: '', component: UserRegistrationPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRegistrationRoutingModule {}

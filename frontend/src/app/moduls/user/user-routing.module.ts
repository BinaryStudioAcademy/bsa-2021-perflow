import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileEditComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'otherlogin',
    loadChildren: () => import('./modules/login-other/login-other.module').then((m) => m.LoginOtherModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/user-registration.module').then((m) => m.UserRegistrationModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/main-content-container/main-content-container.module')
      .then((m) => m.MainContentContainerModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

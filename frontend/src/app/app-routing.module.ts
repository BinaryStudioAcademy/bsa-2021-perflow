import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// use auth.guard for prevent unauthorized users

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./moduls/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import('./moduls/main/main.module').then((m) => m.MainModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./moduls/register/user-registration.module').then((m) => m.UserRegistrationModule)
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

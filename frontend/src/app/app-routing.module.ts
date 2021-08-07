import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// use auth.guard for prevent unauthorized users

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/main/main.module').then((m) => m.MainModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/user-registration.module').then((m) => m.UserRegistrationModule)
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

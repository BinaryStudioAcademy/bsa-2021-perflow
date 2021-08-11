import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/user-registration.module').then((m) => m.UserRegistrationModule)
  },
<<<<<<< HEAD
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
=======
  {
    path: '',
    loadChildren: () => import('./modules/main/main.module').then((m) => m.MainModule),
    canLoad: [AuthGuard]
  }
>>>>>>> merge
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

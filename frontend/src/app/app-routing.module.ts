import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

<<<<<<< HEAD
//use auth.guard for prevent unauthorized users
const routes: Routes = [

=======
const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./moduls/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./moduls/main/main.module').then((m) => m.MainModule)
  },
  { path: '**', redirectTo: '' }
>>>>>>> 6fab1a93350a2b63deac7e22cde8cf476350abe6
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

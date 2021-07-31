import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

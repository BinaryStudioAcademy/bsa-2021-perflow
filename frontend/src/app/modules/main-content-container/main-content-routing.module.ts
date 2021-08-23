import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { PerflowStudioGuard } from 'src/app/guards/perflow-studio.guard';
import { MainContentComponent } from './main-content/main-content.component';

const routes: Routes = [
  {
    path: '',
    component: MainContentComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'perflowstudio',
        loadChildren: () => import('../perflow-studio/perflow-studio.module').then((m) => m.PerflowStudioModule),
        canLoad: [PerflowStudioGuard]
      },
      {
        path: '',
        loadChildren: () => import('../main/main.module').then((m) => m.MainModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainContentRoutingModule { }

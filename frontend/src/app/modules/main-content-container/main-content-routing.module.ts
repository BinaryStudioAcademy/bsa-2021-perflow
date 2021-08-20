import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerflowStudioGuard } from 'src/app/guards/perflow-studio.guard';

const routes: Routes = [
  {
    path: 'perflowstudio',
    loadChildren: () => import('../perflow-studio/perflow-studio.module').then((m) => m.PerflowStudioModule),
    canLoad: [PerflowStudioGuard]
  },
  {
    path: '',
    loadChildren: () => import('../main/main.module').then((m) => m.MainModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainContentRoutingModule { }

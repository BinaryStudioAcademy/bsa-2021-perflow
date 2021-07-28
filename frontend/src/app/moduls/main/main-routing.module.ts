import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuNavComponent } from './menu-nav/menu-nav.component';

const routes: Routes = [{ path: '', component: MenuNavComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { MaterialComponentsModule } from 'src/app/common/material-components.module';


@NgModule({
  declarations: [
    MenuNavComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialComponentsModule
  ]
})
export class MainModule { }

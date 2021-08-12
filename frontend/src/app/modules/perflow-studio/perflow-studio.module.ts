import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { PerflowStudioRoutingModule } from './perflow-studio-routing.module';
import { MainModule } from '../main/main.module';



@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    PerflowStudioRoutingModule,
    MainModule
  ]
})
export class PerflowStudioModule { }

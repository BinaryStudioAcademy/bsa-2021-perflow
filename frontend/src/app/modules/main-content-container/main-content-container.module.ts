import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MainContentRoutingModule } from './main-content-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProfileMenuComponent,
    MainContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainContentRoutingModule,
    SharedModule
  ]
})
export class MainContentContainerModule { }

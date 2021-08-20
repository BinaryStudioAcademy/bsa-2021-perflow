import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { MainContentComponent } from './main-content/main-content.component';

@NgModule({
  declarations: [
    ProfileMenuComponent,
    MainContentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainContentContainerModule { }

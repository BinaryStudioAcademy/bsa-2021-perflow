import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { PerflowStudioRoutingModule } from './perflow-studio-routing.module';
import { MainModule } from '../main/main.module';
import { LeftSideMenuComponent } from './left-side-menu/left-side-menu.component';
import { AlbumsPageComponent } from './albums-page/albums-page.component';
import { PlaylistsPageComponent } from './playlists-page/playlists-page.component';

@NgModule({
  declarations: [
    MainPageComponent,
    LeftSideMenuComponent,
    AlbumsPageComponent,
    PlaylistsPageComponent
  ],
  imports: [
    CommonModule,
    PerflowStudioRoutingModule,
    MainModule
  ]
})
export class PerflowStudioModule { }

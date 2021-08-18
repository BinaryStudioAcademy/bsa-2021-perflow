import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MainPageComponent } from './main-page/main-page.component';
import { PerflowStudioRoutingModule } from './perflow-studio-routing.module';
import { MainModule } from '../main/main.module';
import { LeftSideMenuComponent } from './left-side-menu/left-side-menu.component';
import { AlbumsPageComponent } from './albums-page/albums-page.component';
import { PlaylistsPageComponent } from './playlists-page/playlists-page.component';
import { SharedModule } from '../shared/shared.module';
import { CreateEditAlbumComponent } from './create-edit-album/create-edit-album/create-edit-album.component';
import { EditAlbumModalComponent } from './create-edit-album/edit-album-modal/edit-album-modal.component';
import { SongsUploadModalComponent } from './create-edit-album/songs-upload-modal/songs-upload-modal.component';

@NgModule({
  declarations: [
    MainPageComponent,
    LeftSideMenuComponent,
    AlbumsPageComponent,
    PlaylistsPageComponent,
    CreateEditAlbumComponent,
    EditAlbumModalComponent,
    SongsUploadModalComponent
  ],
  imports: [
    CommonModule,
    PerflowStudioRoutingModule,
    MainModule,
    SharedModule,
    RouterModule,
    FormsModule
  ]
})
export class PerflowStudioModule { }

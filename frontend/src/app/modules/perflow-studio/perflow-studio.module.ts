import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
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
import { ApplicationsPageComponent } from './applications-page/applications-page.component';
import { AplicantRowComponent } from './applications-page/components/aplicant-row/aplicant-row.component';
import { RoleRowComponent } from './applications-page/components/role-row/role-row.component';
import { CreateEditContainerComponent }
  from './constructor/create-edit-container/create-edit-container/create-edit-container.component';
import { ContainersPageComponent } from './constructor/containers-page/containers-page/containers-page.component';
import { ContainerSearchComponent }
  from './constructor/container-search/container-search/container-search.component';
import { ContainerSearchModalComponent }
  from './constructor/container-search-modal/container-search-modal/container-search-modal.component';
import { EditGroupModalComponent } from './edit-group/edit-group-modal/edit-group-modal.component';
import { EditGroupComponent } from './edit-group/edit-group/edit-group/edit-group.component';
import { LoginOtherModule } from '../login-other/login-other.module';

@NgModule({
  declarations: [
    MainPageComponent,
    LeftSideMenuComponent,
    AlbumsPageComponent,
    PlaylistsPageComponent,
    CreateEditAlbumComponent,
    EditAlbumModalComponent,
    SongsUploadModalComponent,
    CreateEditContainerComponent,
    ContainersPageComponent,
    ContainerSearchComponent,
    ContainerSearchModalComponent,
    ApplicationsPageComponent,
    AplicantRowComponent,
    RoleRowComponent,
    EditGroupModalComponent,
    EditGroupComponent
  ],
  imports: [
    CommonModule,
    PerflowStudioRoutingModule,
    MainModule,
    SharedModule,
    RouterModule,
    FormsModule,
    DragDropModule,
    LoginOtherModule
  ],
  exports: [
    EditAlbumModalComponent
  ]
})
export class PerflowStudioModule { }

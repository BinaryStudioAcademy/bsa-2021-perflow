import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { SharedModule } from '../shared/shared.module';
import { AlbumCardComponent } from './components/album-card/album-card.component';
import { CreateEditAlbumComponent } from './components/create-edit-album/create-edit-album/create-edit-album.component';
import { EditAlbumModalComponent } from './components/create-edit-album/edit-album-modal/edit-album-modal.component';
import {
  SongsUploadModalComponent
} from './components/create-edit-album/songs-upload-modal/songs-upload-modal.component';

@NgModule({
  declarations: [
    AlbumDetailsComponent,
    AlbumCardComponent,
    CreateEditAlbumComponent,
    EditAlbumModalComponent,
    SongsUploadModalComponent
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    AlbumDetailsComponent,
    AlbumCardComponent
  ]
})
export class AlbumModule { }

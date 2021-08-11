import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { SharedModule } from '../shared/shared.module';
import { AlbumCardComponent } from './components/album-card/album-card.component';

@NgModule({
  declarations: [
    AlbumDetailsComponent,
    AlbumCardComponent
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    AlbumDetailsComponent,
    AlbumCardComponent
  ]
})
export class AlbumModule { }

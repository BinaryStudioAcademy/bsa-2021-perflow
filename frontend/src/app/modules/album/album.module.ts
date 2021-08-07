import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';

@NgModule({
  declarations: [
    AlbumDetailsComponent
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule
  ],
  exports: [
    AlbumDetailsComponent
  ]
})
export class AlbumModule { }

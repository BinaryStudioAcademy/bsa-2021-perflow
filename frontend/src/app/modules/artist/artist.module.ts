import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistDetailsComponent } from './components/artist-details/artist-details.component';
import { ArtistRoutingModule } from './artist-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ArtistDetailsComponent
  ],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    SharedModule
  ],
  exports: [
    ArtistDetailsComponent
  ]
})
export class ArtistModule { }

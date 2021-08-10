import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistDetailsComponent } from './components/artist-details/artist-details.component';
import { ArtistRoutingModule } from './artist-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AlbumModule } from '../album/album.module';
import { PlaylistCardComponent } from './components/playlist-card/playlist-card.component';

@NgModule({
  declarations: [
    ArtistDetailsComponent,
    PlaylistCardComponent
  ],
  imports: [
    CommonModule,
    ArtistRoutingModule,
    SharedModule,
    AlbumModule
  ]
})
export class ArtistModule { }

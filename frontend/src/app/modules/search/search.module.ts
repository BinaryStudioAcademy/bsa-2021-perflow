import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SongsResultComponent } from './components/songs-result/songs-result.component';
import { ArtistsResultComponent } from './components/artists-result/artists-result.component';
import { AlbumsResultComponent } from './components/albums-result/albums-result.component';
import { PlaylistsResultComponent } from './components/playlists-result/playlists-result.component';
import { SearchRoutingModule } from './search-routing.module';

@NgModule({
  declarations: [
    SearchPageComponent,
    SongsResultComponent,
    ArtistsResultComponent,
    AlbumsResultComponent,
    PlaylistsResultComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }

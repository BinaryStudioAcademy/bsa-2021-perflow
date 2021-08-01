import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';
import { SongsComponent } from './songs/songs.component';
import { AllPlaylistsComponent } from './playlists-all/all-playlists.component';
import { ArtistsComponent } from './artists/artists.component';

@NgModule({
  declarations: [
    AllPlaylistsComponent,
    ArtistsComponent,
    MainMenuComponent,
    MainHomeComponent,
    PlaylistComponent,
    SearchComponent,
    SongsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }

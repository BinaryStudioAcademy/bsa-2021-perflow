import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { PlaylistCardComponent } from './cards/playlist-card/playlist-card.component';
import { MainRoutingModule } from './main-routing.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';
import { SongsComponent } from './songs/songs.component';
import { AllPlaylistsComponent } from './playlists-all/all-playlists.component';
import { ArtistsComponent } from './artists/artists.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumCardComponent } from './cards/album-card/album-card.component';
import { SharedModule } from '../shared/shared.module';
import { SongCardComponent } from './cards/song-card/song-card.component';
import { YourMixCardComponent } from './cards/your-mix-card/your-mix-card.component';

@NgModule({
  declarations: [
    AlbumsComponent,
    AllPlaylistsComponent,
    ArtistsComponent,
    MainMenuComponent,
    MainHomeComponent,
    PlaylistComponent,
    SearchComponent,
    SongsComponent,
    ProfileMenuComponent,
    PlaylistCardComponent,
    AlbumCardComponent,
    SongCardComponent,
    YourMixCardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  exports: [ProfileMenuComponent]
})
export class MainModule { }

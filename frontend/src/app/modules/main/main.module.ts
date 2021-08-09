import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickOutsideModule } from 'ng-click-outside';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { RecentlyPlayedCardComponent } from './cards/recently-played-card/recently-played-card.component';
import { YourMixCardComponent } from './cards/your-mix-card/your-mix-card.component';
import { MainRoutingModule } from './main-routing.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';
import { SongsComponent } from './songs/songs.component';
import { ArtistListComponent } from './playlist/artist-list/artist-list.component';
import { ArtistCardComponent } from './cards/artist-card/artist-card.component';
import { SharedModule } from '../shared/shared.module';
import { SquareInfoCardComponent } from './cards/square-info-card/square-info-card.component';
import { CircleInfoCardComponent } from './cards/circle-info-card/circle-info-card.component';
import { MainMenuProfileComponent } from './main-menu-profile/main-menu-profile.component';
import { AlbumListComponent } from './playlist/album-list/album-list.component';
import { AlbumCardComponent } from './cards/album-card/album-card.component';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [
    MainMenuComponent,
    MainHomeComponent,
    PlaylistComponent,
    SearchComponent,
    SongsComponent,
    ProfileMenuComponent,
    RecentlyPlayedCardComponent,
    YourMixCardComponent,
    SquareInfoCardComponent,
    CircleInfoCardComponent,
    YourMixCardComponent,
    ArtistListComponent,
    ArtistCardComponent,
    MainMenuProfileComponent,
    AlbumListComponent,
    AlbumCardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ClickOutsideModule,
    UserModule,
    SharedModule
  ],
  exports: [ProfileMenuComponent]
})
export class MainModule { }

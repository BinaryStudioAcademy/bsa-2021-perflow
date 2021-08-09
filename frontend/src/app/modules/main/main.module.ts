import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickOutsideModule } from 'ng-click-outside';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { CalmRhythmsCardComponent } from './cards/calm-rhythms-card/calm-rhythms-card.component';
import { NewReleasesCardComponent } from './cards/new-releases-card/new-releases-card.component';
import { RecentlyPlayedCardComponent } from './cards/recently-played-card/recently-played-card.component';
import { TopSongsCardComponent } from './cards/top-songs-card/top-songs-card.component';
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
import { MainMenuProfileComponent } from './main-menu-profile/main-menu-profile.component';
import { AlbumListComponent } from './playlist/album-list/album-list.component';
import { AlbumCardComponent } from './cards/album-card/album-card.component';
import { UserModule } from '../user/user.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TopArtistsCardComponent } from './cards/top-artists-card/top-artists-card.component';

@NgModule({
  declarations: [
    MainMenuComponent,
    MainHomeComponent,
    PlaylistComponent,
    SearchComponent,
    SongsComponent,
    ProfileMenuComponent,
    CalmRhythmsCardComponent,
    NewReleasesCardComponent,
    RecentlyPlayedCardComponent,
    TopSongsCardComponent,
    YourMixCardComponent,
    UserProfileComponent,
    TopArtistsCardComponent,
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
  exports: [
    ClickOutsideModule,
    ProfileMenuComponent
  ]
})
export class MainModule { }

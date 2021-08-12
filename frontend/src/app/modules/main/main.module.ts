import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickOutsideModule } from 'ng-click-outside';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AlbumCardComponent } from './cards/album-card/album-card.component';
import { SharedModule } from '../shared/shared.module';
import { SquareInfoCardComponent } from './cards/square-info-card/square-info-card.component';
import { CircleInfoCardComponent } from './cards/circle-info-card/circle-info-card.component';
import { MainMenuProfileComponent } from './main-menu-profile/main-menu-profile.component';
import { UserModule } from '../user/user.module';
import { AllComponent } from './playlist/all/all.component';
import {
  CreateEditPlaylistComponent
} from './create-edit-playlist/create-edit-playlist/create-edit-playlist.component';
import {
  EditPlaylistModalComponent
} from './create-edit-playlist/edit-playlist-modal/edit-playlist-modal.component';
import { SettingsComponent } from './settings/settings.component';
import { AlbumListComponent } from './playlist/album-list/album-list.component';
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
    RecentlyPlayedCardComponent,
    YourMixCardComponent,
    UserProfileComponent,
    TopArtistsCardComponent,
    SquareInfoCardComponent,
    CircleInfoCardComponent,
    ArtistListComponent,
    ArtistCardComponent,
    MainMenuProfileComponent,
    YourMixCardComponent,
    AlbumCardComponent,
    AllComponent,
    CreateEditPlaylistComponent,
    EditPlaylistModalComponent,
    SettingsComponent,
    AlbumListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    ClickOutsideModule,
    UserModule,
    SharedModule,
    ReactiveFormsModule,
    ClipboardModule
  ],
  exports: [
    ClickOutsideModule,
    ProfileMenuComponent,
    AlbumCardComponent
  ]
})
export class MainModule {

}

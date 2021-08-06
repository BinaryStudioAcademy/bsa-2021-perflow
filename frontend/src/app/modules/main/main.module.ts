import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { SharedModule } from '../shared/shared.module';

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

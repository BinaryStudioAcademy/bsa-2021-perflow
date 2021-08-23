import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickOutsideModule } from 'ng-click-outside';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RouterModule } from '@angular/router';
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
import { CropImageComponent } from '../shared/crop-image/crop-image.component';
import { ViewPlaylistComponent } from './view-playlist/view-playlist.component';
import { NewReleaseCardComponent } from './cards/new-release-card/new-release-card/new-release-card.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { PlaylistCardComponent } from './cards/playlist-card/playlist-card.component';
import {
  SearchAlbumsResultComponent
} from './search/components/search-albums-result/search-albums-result.component';
import {
  SearchArtistsResultComponent
} from './search/components/search-artists-result/search-artists-result.component';
import {
  SearchPlaylistsResultComponent
} from './search/components/search-playlists-result/search-playlists-result.component';
import {
  SearchSongsResultComponent
} from './search/components/search-songs-result/search-songs-result.component';
import { AllSongsComponent } from './search/components/all-songs/all-songs.component';
import { AllArtistsComponent } from './search/components/all-artists/all-artists.component';
import { AllAlbumsComponent } from './search/components/all-albums/all-albums.component';
import { AllPlaylistsComponent } from './search/components/all-playlists/all-playlists.component';
import { SongCardComponent } from './cards/song-card/song-card.component';
import { GroupViewComponent } from './group-view/group-view.component';

@NgModule({
  declarations: [
    MainMenuComponent,
    MainHomeComponent,
    PlaylistComponent,
    SearchComponent,
    SongsComponent,
    RecentlyPlayedCardComponent,
    YourMixCardComponent,
    UserProfileComponent,
    TopArtistsCardComponent,
    SquareInfoCardComponent,
    CircleInfoCardComponent,
    PlaylistCardComponent,
    ArtistListComponent,
    ArtistCardComponent,
    YourMixCardComponent,
    AlbumCardComponent,
    AllComponent,
    CreateEditPlaylistComponent,
    EditPlaylistModalComponent,
    SettingsComponent,
    AlbumListComponent,
    CropImageComponent,
    ViewPlaylistComponent,
    NewReleaseCardComponent,
    AlbumDetailsComponent,
    ArtistDetailsComponent,
    NewReleaseCardComponent,
    SearchAlbumsResultComponent,
    SearchArtistsResultComponent,
    SearchPlaylistsResultComponent,
    SearchSongsResultComponent,
    AllSongsComponent,
    AllArtistsComponent,
    AllAlbumsComponent,
    AllPlaylistsComponent,
    SongCardComponent,
    GroupViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    ClickOutsideModule,
    UserModule,
    SharedModule,
    ReactiveFormsModule,
    ClipboardModule,
    ImageCropperModule,
    RouterModule,
    InfiniteScrollModule
  ],
  exports: [
    ClickOutsideModule,
    AlbumCardComponent
  ]
})
export class MainModule {

}

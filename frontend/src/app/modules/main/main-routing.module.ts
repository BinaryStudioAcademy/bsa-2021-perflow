import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainHomeComponent } from './main-home/main-home.component';
import { AlbumListComponent } from './playlist/album-list/album-list.component';
import { AllComponent } from './playlist/all/all.component';
import { ArtistListComponent } from './playlist/artist-list/artist-list.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';
import { SongsComponent } from './songs/songs.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from '../../guards/auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { ViewPlaylistComponent } from './view-playlist/view-playlist.component';
import { UserProfileEditComponent } from '../user/user-profile-edit/user-profile-edit.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { ArtistDetailsComponent } from './artist-details/artist-details.component';
import { AllSongsComponent } from './search/components/all-songs/all-songs.component';
import { AllArtistsComponent } from './search/components/all-artists/all-artists.component';
import { AllAlbumsComponent } from './search/components/all-albums/all-albums.component';
import { AllPlaylistsComponent } from './search/components/all-playlists/all-playlists.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { GroupViewComponent } from './group-view/group-view.component';
import {
  CreateEditPlaylistComponent
} from '../shared/create-edit-playlist/create-edit-playlist/create-edit-playlist.component';
import { AllGroupsComponent } from './search/components/all-groups/all-groups/all-groups.component';

const routes: Routes = [{
  path: '',
  component: MainMenuComponent,
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: MainHomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'search/:term/songs', component: AllSongsComponent },
    { path: 'search/:term/artists', component: AllArtistsComponent },
    { path: 'search/:term/albums', component: AllAlbumsComponent },
    { path: 'search/:term/playlists', component: AllPlaylistsComponent },
    { path: 'search/:term/groups', component: AllGroupsComponent },
    { path: 'search/:term', component: SearchComponent },
    {
      path: 'profile',
      children: [
        { path: '', component: UserProfileComponent },
        { path: 'edit', component: UserProfileEditComponent }
      ]
    },
    {
      path: 'playlists',
      children: [
        { path: 'view-playlist/:id', component: ViewPlaylistComponent },
        { path: 'edit/:id', component: CreateEditPlaylistComponent },
        { path: 'create', component: CreateEditPlaylistComponent },
        {
          path: '',
          component: PlaylistComponent,
          children: [
            { path: 'artists', component: ArtistListComponent },
            { path: 'albums', component: AlbumListComponent },
            { path: 'all', component: AllComponent },
            { path: '**', redirectTo: 'all' }
          ]
        }
      ]
    },
    { path: 'songs', component: SongsComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'albums/:id', component: AlbumDetailsComponent },
    { path: 'groups/:id', component: GroupViewComponent },
    { path: 'artists/:id', component: ArtistDetailsComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {

}

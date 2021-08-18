import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainHomeComponent } from './main-home/main-home.component';
import { MainMenuProfileComponent } from './main-menu-profile/main-menu-profile.component';
import { AlbumListComponent } from './playlist/album-list/album-list.component';
import { AllComponent } from './playlist/all/all.component';
import { ArtistListComponent } from './playlist/artist-list/artist-list.component';
import { PlaylistComponent } from './playlist/playlist.component';
// import { SearchComponent } from './search/search.component';
import { SongsComponent } from './songs/songs.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {
  CreateEditPlaylistComponent
} from './create-edit-playlist/create-edit-playlist/create-edit-playlist.component';
import { AuthGuard } from '../../guards/auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { ViewPlaylistComponent } from './view-playlist/view-playlist.component';
import { UserProfileEditComponent } from '../user/user-profile-edit/user-profile-edit.component';

const routes: Routes = [{
  path: '',
  component: MainMenuProfileComponent,
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: MainHomeComponent },
    // { path: 'search', component: SearchComponent },
    {
      path: 'search',
      loadChildren: () => import('../search/search.module').then((m) => m.SearchModule)
    },
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
    {
      path: 'albums',
      loadChildren: () => import('../album/album.module').then((m) => m.AlbumModule)
    },
    {
      path: 'artists',
      loadChildren: () => import('../artist/artist.module').then((m) => m.ArtistModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {

}

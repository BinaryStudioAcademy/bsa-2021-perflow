import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from 'src/app/guards/auth.guard';
import { MainHomeComponent } from './main-home/main-home.component';
import { MainMenuProfileComponent } from './main-menu-profile/main-menu-profile.component';
import { AlbumListComponent } from './playlist/album-list/album-list.component';
import { AllComponent } from './playlist/all/all.component';
import { ArtistListComponent } from './playlist/artist-list/artist-list.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';
import { SongsComponent } from './songs/songs.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {
  CreateEditPlaylistComponent
} from './create-edit-playlist/create-edit-playlist/create-edit-playlist.component';

const routes: Routes = [{
  path: '',
  component: MainMenuProfileComponent,
  // canActivate: [AuthGuard],
  children: [
    {
      path: '',
      // canActivateChild: [AuthGuard],
      children: [
        { path: 'main', component: MainHomeComponent },
        { path: 'search', component: SearchComponent },
        {
          path: 'playlists',
          children: [
            { path: '', component: PlaylistComponent },
            { path: 'create', component: CreateEditPlaylistComponent },
            { path: 'edit/:id', component: CreateEditPlaylistComponent }
          ]
        },
        { path: 'songs', component: SongsComponent },
        { path: 'profile', component: UserProfileComponent },
        { path: 'playlists/artists', component: ArtistListComponent },
        { path: 'playlists/albums', component: AlbumListComponent },
        { path: 'playlists/all', component: AllComponent },

        {
          path: 'albums',
          loadChildren: () => import('../album/album.module').then((m) => m.AlbumModule)
        }
      ]
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

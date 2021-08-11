import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainHomeComponent } from './main-home/main-home.component';
import { MainMenuProfileComponent } from './main-menu-profile/main-menu-profile.component';
import { AlbumListComponent } from './playlist/album-list/album-list.component';
import { AllComponent } from './playlist/all/all.component';
import { ArtistListComponent } from './playlist/artist-list/artist-list.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';
import { SongsComponent } from './songs/songs.component';
import {
  CreateEditPlaylistComponent
} from './create-edit-playlist/create-edit-playlist/create-edit-playlist.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: MainMenuProfileComponent,
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  children: [
    { path: '', component: MainHomeComponent },
    { path: 'search', component: SearchComponent },
    {
      path: 'playlists',
      children: [
        { path: '', component: PlaylistComponent },
        { path: 'create', component: CreateEditPlaylistComponent },
        { path: 'edit/:id', component: CreateEditPlaylistComponent },
        { path: 'artists', component: ArtistListComponent },
        { path: 'albums', component: AlbumListComponent },
        { path: 'all', component: AllComponent }
      ]
    },
    { path: 'songs', component: SongsComponent },
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
export class MainRoutingModule { }

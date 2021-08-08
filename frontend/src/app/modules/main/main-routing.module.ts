import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from 'src/app/guards/auth.guard';
import { MainHomeComponent } from './main-home/main-home.component';
import { MainMenuProfileComponent } from './main-menu-profile/main-menu-profile.component';
import { AlbumListComponent } from './playlist/album-list/album-list.component';
import { ArtistListComponent } from './playlist/artist-list/artist-list.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';
import { SongsComponent } from './songs/songs.component';

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
        { path: 'playlists', component: PlaylistComponent },
        { path: 'songs', component: SongsComponent },
        { path: 'playlists/artists', component: ArtistListComponent },
        { path: 'playlists/albums', component: AlbumListComponent },
        
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

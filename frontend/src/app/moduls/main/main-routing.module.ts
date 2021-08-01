import { ArtistsComponent } from './artists/artists.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { MainHomeComponent } from './main-home/main-home.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AllPlaylistsComponent } from './playlists-all/all-playlists.component';
import { SearchComponent } from './search/search.component';
import { SongsComponent } from './songs/songs.component';

const routes: Routes = [{
  path: '',
  component: MainMenuComponent,
  canActivate: [AuthGuard],
  children: [
      { path: 'main', component: MainHomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'playlists', component: PlaylistComponent, 
      canActivate: [AuthGuard],
      children: [
          { path: 'all', component: AllPlaylistsComponent },
          { path: 'artists', component: ArtistsComponent }
      ]},
      { path: 'songs', component: SongsComponent }
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}

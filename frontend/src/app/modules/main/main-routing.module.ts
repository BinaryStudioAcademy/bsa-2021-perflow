import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainHomeComponent } from './main-home/main-home.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';
import { SongsComponent } from './songs/songs.component';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [{
  path: '',
  component: MainMenuComponent,
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  children: [
    { path: '', component: MainHomeComponent },
    { path: 'search', component: SearchComponent },
    { path: 'playlists', component: PlaylistComponent },
    { path: 'songs', component: SongsComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { SearchComponent } from './search/search.component';
import { SongsComponent } from './songs/songs.component';

const routes: Routes = [{
  path: '',
  component: MainMenuComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      canActivateChild: [AuthGuard],
      children: [
        { path: 'main', component: MainHomeComponent },
        { path: 'search', component: SearchComponent },
        { path: 'playlists', component: PlaylistComponent },
        { path: 'songs', component: SongsComponent },
        { path: 'profile', component: UserProfileComponent }
      ]
    }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AlbumsPageComponent } from './albums-page/albums-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PlaylistsPageComponent } from './playlists-page/playlists-page.component';

const routes: Routes = [{
  path: '',
  component: MainPageComponent,
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  children: [
    { path: '', redirectTo: 'playlists', pathMatch: 'full' },
    { path: 'playlists', component: PlaylistsPageComponent },
    { path: 'albums', component: AlbumsPageComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerflowStudioRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerflowStudioGuard } from 'src/app/guards/perflow-studio.guard';
import { AlbumsPageComponent } from './albums-page/albums-page.component';
import { CreateEditAlbumComponent } from './create-edit-album/create-edit-album/create-edit-album.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PlaylistsPageComponent } from './playlists-page/playlists-page.component';

const routes: Routes = [{
  path: '',
  component: MainPageComponent,
  canActivate: [PerflowStudioGuard],
  canActivateChild: [PerflowStudioGuard],
  children: [
    { path: '', redirectTo: 'playlists', pathMatch: 'full' },
    { path: 'playlists', component: PlaylistsPageComponent },
    {
      path: 'albums',
      children: [
        { path: '', component: AlbumsPageComponent },
        { path: 'create', component: CreateEditAlbumComponent },
        { path: 'edit/:id', component: CreateEditAlbumComponent }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerflowStudioRoutingModule { }

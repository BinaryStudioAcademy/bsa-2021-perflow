import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistPerflowStudioGuard } from 'src/app/guards/artist-perflow-studio.guard';
import { ModeratorPerflowStudioGuard } from 'src/app/guards/moderator-perflow-studio.guard';
import { PerflowStudioGuard } from 'src/app/guards/perflow-studio.guard';
import {
  CreateEditPlaylistComponent
} from '../shared/create-edit-playlist/create-edit-playlist/create-edit-playlist.component';
import { AlbumsPageComponent } from './albums-page/albums-page.component';
import { ContainersPageComponent } from './constructor/containers-page/containers-page/containers-page.component';
import { CreateEditContainerComponent }
  from './constructor/create-edit-container/create-edit-container/create-edit-container.component';
import { ApplicationsPageComponent } from './applications-page/applications-page.component';
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
    {
      path: 'playlists',
      canActivate: [ModeratorPerflowStudioGuard],
      canActivateChild: [ModeratorPerflowStudioGuard],
      children: [
        { path: '', component: PlaylistsPageComponent },
        { path: 'create', component: CreateEditPlaylistComponent },
        { path: 'edit/:id', component: CreateEditPlaylistComponent }
      ]
    },
    {
      path: 'albums',
      canActivate: [ArtistPerflowStudioGuard],
      canActivateChild: [ArtistPerflowStudioGuard],
      children: [
        { path: '', component: AlbumsPageComponent },
        { path: 'create', component: CreateEditAlbumComponent },
        { path: 'edit/:id', component: CreateEditAlbumComponent }
      ]
    },
    {
      path: 'constructor',
      children: [
        { path: '', component: ContainersPageComponent },
        { path: 'create', component: CreateEditContainerComponent },
        { path: 'edit/:id', component: CreateEditContainerComponent }
      ]
    },
    {
      path: 'applicants',
      component: ApplicationsPageComponent,
      canActivate: [ModeratorPerflowStudioGuard]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerflowStudioRoutingModule { }

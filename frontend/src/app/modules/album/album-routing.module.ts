import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { CreateEditAlbumComponent } from './components/create-edit-album/create-edit-album/create-edit-album.component';

const routes: Routes = [
  { path: 'create', component: CreateEditAlbumComponent },
  { path: 'edit/:id', component: CreateEditAlbumComponent },
  { path: ':id', component: AlbumDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }

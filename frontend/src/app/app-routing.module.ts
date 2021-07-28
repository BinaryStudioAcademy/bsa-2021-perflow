import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: '', loadChildren: () => import('./moduls/auth/auth.module').then(m => m.AuthModule )},
{ path: 'main', loadChildren: () => import('./moduls/main/main.module').then(m => m.MainModule )},
{ path: '**', redirectTo: '' },
// { path: 'search', loadChildren: () => import('./moduls/search/search.module').then(m => m.SearchModule) },
// { path: 'playlists', loadChildren: () => import('./moduls/playlists/playlists.module').then(m => m.PlaylistsModule) },
// { path: 'songs', loadChildren: () => import('./moduls/songs/songs.module').then(m => m.SongsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

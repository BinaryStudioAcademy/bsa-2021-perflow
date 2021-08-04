import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongRowComponent } from '../../components/shared/song-row/song-row.component';
import { SortSongsPipe } from './pipes/sort-songs.pipe';
import { SortOrderIconComponent } from './songs-list-header/sort-order-icon/sort-order-icon.component';
import { SongsListComponent } from './songs-list/songs-list.component';
import { SongsListHeaderComponent } from './songs-list-header/songs-list-header.component';

@NgModule({
  declarations: [
    SortSongsPipe,
    SongRowComponent,
    SortOrderIconComponent,
    SongsListHeaderComponent,
    SongsListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortSongsPipe,
    SongRowComponent,
    SortOrderIconComponent,
    SongsListHeaderComponent,
    SongsListComponent
  ]
})
export class SharedModule { }

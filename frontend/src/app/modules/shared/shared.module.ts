import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongImageComponent } from './upload/song-image/song-image.component';
import { SongToolbarComponent } from './song-toolbar/song-toolbar.component';
import { SongRowComponent } from './song-row/song-row.component';
import { DragDropDirective } from './directives/upload/song-image/drag-drop.directive';
import { ShowHideDirective } from './directives/show/show-hide.directive';
import { SortSongsPipe } from './pipes/sort-songs.pipe';
import { SortOrderIconComponent } from './songs-list-header/sort-order-icon/sort-order-icon.component';
import { SongsListHeaderComponent } from './songs-list-header/songs-list-header.component';
import { SongsListComponent } from './songs-list/songs-list.component';
import { SemanticDropdownDirective } from './directives/dropdown/semantic-dropdown.directive';
import { AccessTypePipe } from './pipes/access-type.pipe';

@NgModule({
  declarations: [
    SongRowComponent,
    SongToolbarComponent,
    SongImageComponent,
    DragDropDirective,
    ShowHideDirective,
    SemanticDropdownDirective,
    SortSongsPipe,
    SongRowComponent,
    SortOrderIconComponent,
    SongsListHeaderComponent,
    SongsListComponent,
    AccessTypePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SongRowComponent,
    SongToolbarComponent,
    SongImageComponent,
    DragDropDirective,
    ShowHideDirective,
    SemanticDropdownDirective,
    SortSongsPipe,
    SongRowComponent,
    SortOrderIconComponent,
    SongsListHeaderComponent,
    SongsListComponent,
    AccessTypePipe
  ]
})
export class SharedModule { }

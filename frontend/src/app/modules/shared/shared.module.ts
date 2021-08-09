import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SemanticDropdownDirective } from './directives/dropdown/semantic-dropdown.directive';
import { SemanticCalendarDirective } from './directives/calendar/semantic-calendar.directive';
import { SemanticMessageDirective } from './directives/message/semantic-message.directive';
import { SongImageComponent } from './upload/song-image/song-image.component';
import { SongToolbarComponent } from './song-toolbar/song-toolbar.component';
import { SongRowComponent } from './song-row/song-row.component';
import { DragDropDirective } from './directives/upload/song-image/drag-drop.directive';
import { ShowHideDirective } from './directives/show/show-hide.directive';
import { SortSongsPipe } from './pipes/sort-songs.pipe';
import { SortOrderIconComponent } from './songs-list-header/sort-order-icon/sort-order-icon.component';
import { SongsListHeaderComponent } from './songs-list-header/songs-list-header.component';
import { SongsListComponent } from './songs-list/songs-list.component';
import { AccessTypePipe } from './pipes/access-type.pipe';
import { SongDurationPipe } from './pipes/song-duration.pipe';
import { ItemsSumPipe } from './pipes/items-sum.pipe';
import { AlbumDurationPipe } from './pipes/album-duration.pipe';

@NgModule({
  declarations: [
    SemanticDropdownDirective,
    SemanticCalendarDirective,
    SemanticMessageDirective,
    SongRowComponent,
    SongToolbarComponent,
    SongImageComponent,
    DragDropDirective,
    ShowHideDirective,
    SortSongsPipe,
    SongRowComponent,
    SortOrderIconComponent,
    SongsListHeaderComponent,
    SongsListComponent,
    AccessTypePipe,
    SongDurationPipe,
    ItemsSumPipe,
    AlbumDurationPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SemanticDropdownDirective,
    SemanticCalendarDirective,
    SemanticMessageDirective,
    SongRowComponent,
    SongToolbarComponent,
    SongImageComponent,
    DragDropDirective,
    ShowHideDirective,
    SortSongsPipe,
    SongRowComponent,
    SortOrderIconComponent,
    SongsListHeaderComponent,
    SongsListComponent,
    AccessTypePipe,
    SongDurationPipe,
    ItemsSumPipe,
    AlbumDurationPipe
  ]
})

export class SharedModule { }

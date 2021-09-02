import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';
import { SemanticDropdownDirective } from './directives/dropdown/semantic-dropdown.directive';
import { SemanticCalendarDirective } from './directives/calendar/semantic-calendar.directive';
import { SemanticMessageDirective } from './directives/message/semantic-message.directive';
import { SongImageComponent } from './upload/song-image/song-image.component';
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
import { SearchSongRowComponent } from './playlist/search-song-row/search-song-row.component';
import { AlbumRegionTypePipe } from './pipes/album-region-type.pipe';
import { AuthorTypePipe } from './pipes/album-author-type.pipe';
import { ClickStopPropagationDirective } from './directives/stopPropagation/click-stop-propagation.directive';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { HideScrollButtonsDirective } from './directives/hide-scroll-button/hide-scroll-buttons.directive';
import {
  CreateEditPlaylistComponent
} from './create-edit-playlist/create-edit-playlist/create-edit-playlist.component';
import {
  EditPlaylistModalComponent
} from './create-edit-playlist/edit-playlist-modal/edit-playlist-modal.component';
import { CropImageComponent } from './crop-image/crop-image.component';
import { FilterExplicitPipe } from './pipes/filter-explicit.pipe';
import { ColaborativeModalComponent } from './create-edit-playlist/colaborative-modal/colaborative-modal.component';

@NgModule({
  declarations: [
    SemanticDropdownDirective,
    SemanticCalendarDirective,
    SemanticMessageDirective,
    SongRowComponent,
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
    AlbumDurationPipe,
    SearchSongRowComponent,
    ClickStopPropagationDirective,
    AlbumRegionTypePipe,
    AuthorTypePipe,
    SnackbarComponent,
    HideScrollButtonsDirective,
    CreateEditPlaylistComponent,
    EditPlaylistModalComponent,
    CropImageComponent,
    FilterExplicitPipe,
    ColaborativeModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ImageCropperModule,
    DragDropModule,
    FormsModule,
    ClickOutsideModule
  ],
  exports: [
    SemanticDropdownDirective,
    SemanticCalendarDirective,
    SemanticMessageDirective,
    SongRowComponent,
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
    AlbumDurationPipe,
    SearchSongRowComponent,
    ClickStopPropagationDirective,
    AlbumRegionTypePipe,
    AuthorTypePipe,
    SnackbarComponent,
    HideScrollButtonsDirective,
    CreateEditPlaylistComponent,
    EditPlaylistModalComponent,
    CropImageComponent
  ]
})

export class SharedModule { }

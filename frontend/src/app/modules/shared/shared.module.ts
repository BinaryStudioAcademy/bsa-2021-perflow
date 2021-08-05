import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongImageComponent } from './upload/song-image/song-image.component';
import { SongToolbarComponent } from './song-toolbar/song-toolbar.component';
import { SongRowComponent } from './song-row/song-row.component';
import { DragDropDirective } from './directives/upload/song-image/drag-drop.directive';
import { ShowHideDirective } from './directives/show/show-hide.directive';
import { SemanticDropdownDirective } from './directives/dropdown/semantic-dropdown.directive';

@NgModule({
  declarations: [
    SongRowComponent,
    SongToolbarComponent,
    SongImageComponent,
    DragDropDirective,
    ShowHideDirective,
    SemanticDropdownDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SongRowComponent,
    SongToolbarComponent,
    SongImageComponent
  ]
})
export class SharedModule { }

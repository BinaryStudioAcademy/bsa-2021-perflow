import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongRowComponent } from './song-row/song-row.component';
import { SongToolbarComponent } from './song-toolbar/song-toolbar.component';
import { SongImageComponent } from './upload/song-image/song-image.component';



@NgModule({
  declarations: [
    SongRowComponent,
    SongToolbarComponent,
    SongImageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SongRowComponent,
    SongToolbarComponent,
    SongImageComponent
  ]
})
export class SharedModule { }

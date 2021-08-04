import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
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
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ],
  exports: [
    SongRowComponent,
    SongToolbarComponent,
    SongImageComponent,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ]
})
export class SharedModule { }

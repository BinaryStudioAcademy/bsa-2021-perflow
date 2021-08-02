import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongImageComponent } from './components/shared/upload/song-image/song-image.component';
import { DragDropDirective } from './directives/shared/upload/song-image/drag-drop.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './moduls/auth/auth.module';
import { SongRowComponent } from './components/shared/song-row/song-row.component';
import { SemanticDropdownDirective } from './directives/shared/dropdown/semantic-dropdown.directive';

@NgModule({
  declarations: [
    AppComponent,
    SongImageComponent,
    DragDropDirective,
    SongRowComponent,
    SemanticDropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

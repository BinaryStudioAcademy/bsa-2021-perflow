import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongToolbarComponent } from './components/shared/song-toolbar/song-toolbar.component';
import { SongImageComponent } from './components/shared/upload/song-image/song-image.component';
import { ShowHideDirective } from './directives/shared/show/show-hide.directive';
import { DragDropDirective } from './directives/shared/upload/song-image/drag-drop.directive';
import { AuthModule } from './moduls/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    SongImageComponent,
    DragDropDirective,
    SongToolbarComponent,
    ShowHideDirective
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

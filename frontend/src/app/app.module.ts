import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SongImageComponent } from './components/shared/upload/song-image/song-image.component';
import { DragDropDirective } from './directives/shared/upload/song-image/drag-drop.directive';
import { AuthModule } from './moduls/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    SongImageComponent,
    DragDropDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
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

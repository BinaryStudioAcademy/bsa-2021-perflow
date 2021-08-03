import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SongToolbarComponent } from './components/shared/song-toolbar/song-toolbar.component';
import { SongImageComponent } from './components/shared/upload/song-image/song-image.component';
import { ShowHideDirective } from './directives/shared/show/show-hide.directive';
import { DragDropDirective } from './directives/shared/upload/song-image/drag-drop.directive';
import { AuthModule } from './moduls/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SongImageComponent,
    DragDropDirective,
    SongToolbarComponent,
    ShowHideDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AuthModule,
    HttpClientModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

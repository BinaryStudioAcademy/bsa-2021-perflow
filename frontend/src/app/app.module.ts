import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SongImageComponent } from './components/shared/upload/song-image/song-image.component';
import { DragDropDirective } from './directives/shared/upload/song-image/drag-drop.directive';
import { AuthModule } from './moduls/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SongImageComponent,
    DragDropDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AuthModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

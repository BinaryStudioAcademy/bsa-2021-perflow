import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SongImageComponent } from './components/shared/upload/song-image/song-image.component';
import { DragDropDirective } from './directives/shared/upload/song-image/drag-drop.directive';
import { AuthModule } from './moduls/auth/auth.module';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RecentlyPlayedCardComponent } from './components/shared/recently-played-card/recently-played-card.component';
import { NewReleasesCardComponent } from './components/shared/new-releases-card/new-releases-card.component';
import { CalmRhythmsCardComponent } from './components/shared/calm-rhythms-card/calm-rhythms-card.component';
import { YourMixCardComponent } from './components/shared/your-mix-card/your-mix-card.component';
import { TopSongsCardComponent } from './components/shared/top-songs-card/top-songs-card.component';

@NgModule({
  declarations: [
    AppComponent,
    SongImageComponent,
    DragDropDirective,
    AppComponent,
    MainPageComponent,
    RecentlyPlayedCardComponent,
    NewReleasesCardComponent,
    CalmRhythmsCardComponent,
    YourMixCardComponent,
    TopSongsCardComponent
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

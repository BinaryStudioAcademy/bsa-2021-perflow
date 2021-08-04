import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { SongToolbarComponent } from './components/shared/song-toolbar/song-toolbar.component';
import { SongImageComponent } from './components/shared/upload/song-image/song-image.component';
import { ShowHideDirective } from './directives/shared/show/show-hide.directive';
import { DragDropDirective } from './directives/shared/upload/song-image/drag-drop.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import { SongRowComponent } from './components/shared/song-row/song-row.component';
import { SemanticDropdownDirective } from './directives/shared/dropdown/semantic-dropdown.directive';

import { AppRoutingModule } from './app-routing.module';
import { FireBaseModule } from './shared/firebase-auth/firebase-auth.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SongImageComponent,
    DragDropDirective,
    SongToolbarComponent,
    ShowHideDirective,
    SongRowComponent,
    SemanticDropdownDirective
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FireBaseModule,
    BrowserAnimationsModule,
    AuthModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }

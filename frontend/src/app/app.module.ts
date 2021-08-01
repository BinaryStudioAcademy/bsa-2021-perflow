import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SongImageComponent } from './components/shared/upload/song-image/song-image.component';
import { DragDropDirective } from './directives/shared/upload/song-image/drag-drop.directive';
import { AuthModule } from './moduls/auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { FireBaseModule } from './shared/firebase-auth/firebase-auth.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SongImageComponent,
    DragDropDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FireBaseModule,
    BrowserAnimationsModule,
    AuthModule
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
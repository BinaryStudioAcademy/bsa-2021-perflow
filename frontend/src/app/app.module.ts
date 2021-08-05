import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
<<<<<<< HEAD
import { FireBaseModule } from './shared/firebase-auth/firebase-auth.module';

import { JwtInterceptor } from './interceptors/jwt/jwt.interceptor';
=======
import { JwtInterceptor } from './interceptors/jwt/jwt.interceptor';
import { FireBaseModule } from './modules/fire-base/fire-base.module';
>>>>>>> develop

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FireBaseModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { FireBaseModule } from './shared/FireBaseAuth/FireBaseAuth.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FireBaseModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

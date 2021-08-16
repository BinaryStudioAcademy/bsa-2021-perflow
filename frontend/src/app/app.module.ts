import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FirebaseModule } from './modules/firebase/firebase.module';

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
    HttpClientModule,
    FirebaseModule,
    ImageCropperModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }

import { NgModule } from "@angular/core";

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({

    imports: [
        AngularFireModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule
    ],
    exports:[
        AngularFireModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule
    ],
    providers: [],
    
  })
  export class FireBaseModule { }
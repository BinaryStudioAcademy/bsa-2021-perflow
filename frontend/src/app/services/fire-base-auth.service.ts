import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../models/User';
import firebase from 'firebase/app';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireBaseAuthService {

  private currentUserSource = new ReplaySubject<User>();
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth,private router:Router ) 
  {
  
  }

  SignIn(email:string, password:string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if(result.user){
          this.SetUserData(result.user);
        }      
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignUp(email:string, password:string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {   
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  FacebookAuth() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }  

  AuthLogin(provider:any) {
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {  
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  SetUserData(user:any) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }
}

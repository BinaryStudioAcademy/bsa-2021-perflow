import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../../models/User'
import firebase from 'firebase/app';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSource = new ReplaySubject<User>();
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, private router: Router) {
    this.Init();
  }
  Init(){
    const user = JSON.parse(localStorage.getItem('user')!);
    if(user){
      this.currentUserSource.next(user);
    }
  }

  SignIn(email: string, password: string) {

    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user) {
          this.SetUserData(result.user);
        }
      }).catch((error) => {
        console.log(error);
      })
  }


  SignUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
      }).catch((error) => {
        console.log(error);
      })
  }

  FacebookAuth() {
    return this.AuthLogin(new firebase.auth.FacebookAuthProvider());
  }

  RefreshToken() {
    return firebase.auth().currentUser?.getIdToken(true);
  }

  AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.SetUserData(result.user);
      }).catch((error) => {
        console.log(error);
      })
  }

  async SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    let curentToken:string = await this.getCurrentToken()!;

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      token:curentToken
    }
    
    this.currentUserSource.next(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userRef.set(userData, {
      merge: true
    })
  }

   getCurrentToken() {
      return firebase.auth().currentUser?.getIdToken(false)
      .then((result) => {
        console.log(result);
        return result;
      })
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.currentUserSource.next(undefined);
    })
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return (user !== null) ? true : false;
  }
}

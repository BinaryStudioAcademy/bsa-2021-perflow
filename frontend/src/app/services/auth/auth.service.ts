import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import firebase from 'firebase/app';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _currentUserSource = new ReplaySubject<User>();
  currentUser$ = this._currentUserSource.asObservable();

  constructor(private _afs: AngularFirestore, private _afAuth: AngularFireAuth, private _router: Router) {
    this.init();
  }

  init() {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this._currentUserSource.next(user);
    }
  }

  signIn(email: string, password: string) {
    return this._afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        if (result.user) {
          this.setUserData(result.user);
        }
      }).catch((error) => {});
  }

  signUp(email: string, password: string) {
    return this._afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user);
      }).catch((error) => { });
  }

  facebookAuth() {
    return this.authLogin(new firebase.auth.FacebookAuthProvider());
  }

  refreshToken = () => firebase.auth().currentUser?.getIdToken(true);

  authLogin(provider: any) {
    return this._afAuth.signInWithPopup(provider)
      .then((result) => {
        this.setUserData(result.user);
      }).catch((error) => {});
  }

  async setUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> = this._afs.doc(`users/${user.uid}`);
    const curentToken: string = await this.getCurrentToken()!;
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      token: curentToken
    };

    this._currentUserSource.next(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userRef.set(userData, {
      merge: true
    });
  }

  getCurrentToken = () => firebase.auth().currentUser?.getIdToken(false)
    .then((result) => result);

  signOut() {
    return this._afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this._currentUserSource.next(undefined);
    });
  }

  isLoggedIn = (): boolean => {
    const user = JSON.parse(localStorage.getItem('user')!);
    return (user !== null);
  };
}

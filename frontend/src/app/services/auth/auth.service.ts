import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { skip, take } from 'rxjs/operators';
import { AuthUser } from '../../models/auth/auth-user';
import { LoginData } from '../../models/auth/login-data';
import { HttpInternalService } from '../http-internal.service';
import { RegisterData } from '../../models/auth/register-data';

type AuthState = AuthUser | null;

interface RegisterWithEmailParams {
  registerData: RegisterData;
  redirect?: string;
}

interface SignInWithEmailParams {
  email: string;
  password: string;
  remember?: boolean;
  redirect?: string;
}

interface SignInWithSocialsParams {
  remember?: boolean;
  redirect?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentAuthState: AuthState = null;
  private _authStateSubject: ReplaySubject<AuthState> = new ReplaySubject<AuthState>(1);

  constructor(
    private _httpService: HttpInternalService,
    private _fireAuth: AngularFireAuth,
    private _router: Router
  ) {
    this._fireAuth.authState.subscribe(
      (firebaseUser) => this._updateAuthState(firebaseUser)
    );
  }

  get authenticated() {
    return this._currentAuthState !== null;
  }

  getAuthStateObservable() {
    return this._authStateSubject.asObservable();
  }

  getCurrentTokenObservable() {
    return this._fireAuth.idToken;
  }

  async registerWithEmail({ registerData, redirect }: RegisterWithEmailParams) {
    const response = await this._httpService.postFullRequest(
      '/api/auth/register', registerData
    ).toPromise();

    if (!response.ok) {
      return;
    }

    await this.signInWithEmail({
      email: registerData.email,
      password: registerData.password
    });

    if (redirect !== undefined) {
      this._redirectAfterAuthUpdate(redirect);
    }
  }

  async signInWithEmail({
    email,
    password,
    remember,
    redirect
  }: SignInWithEmailParams) {
    await this._setPersistence(remember ?? true);
    await this._fireAuth.signInWithEmailAndPassword(email, password);

    if (redirect !== undefined) {
      this._redirectAfterAuthUpdate(redirect);
    }
  }

  async signInWithGoogle({ remember, redirect }: SignInWithSocialsParams) {
    await this._setPersistence(remember ?? true);

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    await this._fireAuth.signInWithPopup(provider);

    if (redirect !== undefined) {
      this._redirectAfterAuthUpdate(redirect);
    }
  }

  signInWithApple = () => {
    // TODO Implement
  };

  signInWithFacebook = () => {
    // TODO Implement
  };

  signOut() {
    return this._fireAuth.signOut()
      .then(() => this._router.navigateByUrl('/login'));
  }

  private async _updateAuthState(firebaseUser: firebase.User | null) {
    if (!firebaseUser) {
      this._setAuthState(null);
      return;
    }

    if (!AuthService.validateFirebaseUser(firebaseUser)) {
      await this.signOut();
      return;
    }

    const loginData: LoginData = {
      accessToken: await firebaseUser.getIdToken(),
      firebaseId: firebaseUser.uid,
      userName: firebaseUser.displayName!,
      email: firebaseUser.email!
    };

    const response = await this._httpService.postFullRequest(
      '/api/auth/login', loginData
    ).toPromise();

    if (!response.ok) {
      await this.signOut();
      return;
    }

    const tokenResult = await firebaseUser.getIdTokenResult(true);

    const authUser: AuthUser = {
      id: tokenResult.claims.id,
      firebaseId: firebaseUser.uid,
      role: tokenResult.claims.role,
      userName: firebaseUser.displayName!,
      email: firebaseUser.email!,
      accessToken: tokenResult.token,
      refreshToken: firebaseUser.refreshToken
    };

    this._setAuthState(authUser);
  }

  static validateFirebaseUser(firebaseUser: firebase.User) {
    return firebaseUser.email !== undefined && firebaseUser.displayName !== undefined;
  }

  private _setAuthState(authState: AuthState) {
    this._currentAuthState = authState;
    this._authStateSubject.next(authState);
  }

  private _setPersistence(value: boolean) {
    return this._fireAuth.setPersistence(value ? 'local' : 'session');
  }

  private _redirectAfterAuthUpdate(url: string) {
    return this.getAuthStateObservable()
      .pipe(
        skip(1), // skip current authState
        take(1)
      )
      .subscribe(
        (authState) => {
          if (authState !== null) {
            this._router.navigateByUrl(url);
          }
        }
      );
  }
}

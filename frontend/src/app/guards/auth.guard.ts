import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild, CanLoad, Route, UrlSegment
} from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._canActivateObservable();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._canActivateObservable();
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this._canActivateObservable();
  }

  private _canActivateObservable() {
    // return this._authService.getAuthStateObservable().pipe(
    //   map((value) => {
    //     if (value !== null) {
    //       return true;
    //     }

    //     return this._router.parseUrl('/login');
    //   })
    // );
    return true;
  }
}

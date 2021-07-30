import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const { url } = state;

    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  // TODO: Temporary body metod.
  // After adding the token based authorization.
  // Here, in the verification condition, replace the request for the authorization service - token verification.
  checkLogin(url: string): boolean {
    if (this._authService.isLoggedIn) {
      return true;
    }

    this._router.navigate(['/login']);

    return false;
  }
}

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
    protected authService: AuthService,
    protected router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivateObservable();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivateObservable();
  }

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.canActivateObservable();
  }

  protected canActivateObservable() {
    return this.authService.getAuthStateObservable().pipe(
      map((value) => {
        if (value !== null) {
          return true;
        }

        return this.router.parseUrl('/login');
      })
    );
  }
}

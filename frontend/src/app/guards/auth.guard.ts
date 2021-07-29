import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FireBaseAuthService } from '../services/fire-base-auth.service';
import {map} from'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:FireBaseAuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.auth.currentUser$.pipe(
        map(user=>{
          if(user){
            return true;
          }
          return false;
        })
      );
  }
  
}

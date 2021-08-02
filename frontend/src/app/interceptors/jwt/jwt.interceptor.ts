import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/shared/User';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User;

    this._auth.currentUser$.pipe(take(1))
      .subscribe(
        (user) => {
          return currentUser = user;
        });  
    if (currentUser!) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + currentUser.token
        }
      });
    }
    return next.handle(request);
  }
}

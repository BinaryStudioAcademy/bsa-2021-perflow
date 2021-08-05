import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { VerifiedUser } from 'src/app/models/user/verified-user';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: VerifiedUser;
    let result = request;

    this._auth.currentUser$.pipe(take(1))
      .subscribe(
        (user) => {
          currentUser = user;
        }
      );
    if (currentUser!) {
      result = request.clone({
        setHeaders: {
          authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(result);
  }
}

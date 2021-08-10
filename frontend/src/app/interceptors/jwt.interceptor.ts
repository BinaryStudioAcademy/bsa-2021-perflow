import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this._authService.authenticated) {
      return next.handle(request);
    }

    return this._authService.getCurrentTokenObservable().pipe(
      take(1),
      mergeMap((token) => {
        if (token === null) {
          return next.handle(request);
        }

        const modifiedRequest = request.clone({
          setHeaders: { authorization: `Bearer ${token}` }
        });

        return next.handle(modifiedRequest);
      })
    );
  }
}

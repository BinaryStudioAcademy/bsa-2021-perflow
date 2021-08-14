import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthGuard } from './auth.guard';
import { UserRoles } from '../models/enums/user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class PerflowStudioGuard extends AuthGuard {
  protected canActivateObservable() {
    return this.authService.getAuthStateObservable().pipe(
      map((value) => {
        if (value?.role === UserRoles.artist
            || value?.role === UserRoles.moderator) {
          return true;
        }
        return this.router.parseUrl('/');
      })
    );
  }
}

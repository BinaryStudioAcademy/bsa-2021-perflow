import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthGuard } from './auth.guard';
import { UserRoles } from '../models/enums/user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class ModeratorPerflowStudioGuard extends AuthGuard {
  protected canActivateObservable() {
    return this.authService.getAuthStateObservable()
      .pipe(
        map((state) => {
          if (state?.role === UserRoles.moderator) {
            return true;
          }

          return this.router.parseUrl('/perflowstudio/albums');
        })
      );
  }
}

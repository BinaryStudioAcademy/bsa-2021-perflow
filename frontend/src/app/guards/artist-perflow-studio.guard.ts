import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthGuard } from './auth.guard';
import { UserRoles } from '../models/enums/user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class ArtistPerflowStudioGuard extends AuthGuard {
  protected canActivateObservable() {
    return this.authService.getAuthStateObservable()
      .pipe(
        map((state) => {
          if (state?.role === UserRoles.artist || state?.role === UserRoles.teamMember) {
            return true;
          }

          return this.router.parseUrl('/perflowstudio');
        })
      );
  }
}

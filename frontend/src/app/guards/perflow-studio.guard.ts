import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs/operators';
import { AuthGuard } from './auth.guard';
import { UserRoles } from '../models/enums/user-roles.enum';

@Injectable({
  providedIn: 'root'
})
export class PerflowStudioGuard extends AuthGuard {
  protected canActivateObservable() {
    return this.authService.getAuthStateObservable().pipe(
      mergeMap((value) => this.userService.getArtistApplicant().pipe(
        map((value1) => {
          if (value?.role === UserRoles.artist
            || value?.role === UserRoles.moderator) {
            return 'perflowstudio';
          }
          if (value1.body) {
            this.snackbarService.show({
              message: 'Wait until it will be approved.',
              header: 'Your applicant is reviewing.'
            });
            return '/';
          }

          return 'otherlogin';
        })
      )),
      map((result: string) => (result === 'perflowstudio' ? true : this.router.parseUrl(result)))
    );
  }
}

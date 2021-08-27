import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArtistApplicant } from 'src/app/models/user/artist-applicant';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-other-page',
  templateUrl: './other-page.component.html',
  styleUrls: ['./other-page.component.sass']
})
export class OtherPageComponent implements OnDestroy {
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _userService: UserService,
    private _snackbarService: SnackbarService
  ) {

  }

  public ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  createUserApplicant(userRole: number) {
    const artistApplicant = new ArtistApplicant();
    artistApplicant.userRole = userRole;
    this._userService.createArtistApplicant(artistApplicant)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe();
    this._snackbarService.show({
      message: 'Our moderators will review it soon.',
      header: 'Applicant sended!'
    });
  }
}

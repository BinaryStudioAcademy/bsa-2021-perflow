import { Component } from '@angular/core';
import { take } from 'rxjs/operators';
import { ArtistApplicant } from 'src/app/models/user/artist-applicant';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-other-page',
  templateUrl: './other-page.component.html',
  styleUrls: ['./other-page.component.sass']
})
export class OtherPageComponent {
  constructor(
    private _userService: UserService,
    private _snackbarService: SnackbarService
  ) {

  }

  createUserApplicant(userRole: number) {
    const artistApplicant = new ArtistApplicant();
    artistApplicant.userRole = userRole;
    this._userService.createArtistApplicant(artistApplicant)
      .pipe(take(1))
      .subscribe();
    this._snackbarService.show({
      message: 'Our moderators will review it soon.',
      header: 'Applicant sended!'
    });
  }
}

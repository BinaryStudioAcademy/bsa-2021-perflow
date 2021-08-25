import { Component, Input } from '@angular/core';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { UserRoles } from 'src/app/models/enums/user-roles.enum';
import { UserService } from 'src/app/services/user.service';
import { ArtistApplicant } from 'src/app/models/user/artist-applicant';
import { RegisterData } from '../../../models/auth/register-data';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-user-registration-page',
  templateUrl: './user-registration-page.component.html',
  styleUrls: ['./user-registration-page.component.sass']
})
export class UserRegistrationPageComponent {
  @Input()
  isRequiredError: boolean = false;

  userType: UserRoles | undefined;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _snackbarService: SnackbarService,
    private _router: Router
  ) {
    this.userType = this._router.getCurrentNavigation()?.extras.state?.type;
  }

  async onSubmit(newUser: RegisterData) {
    if (!this.userType) {
      await this._authService.registerWithEmail({ registerData: newUser, redirect: '/' });
      this._snackbarService.show({
        message: 'You may now log-in with your email and password.',
        header: 'Registration successful!'
      });
    }
    else {
      const artistApplicant: ArtistApplicant = {
        email: newUser.email,
        userRole: parseInt(UserRoles[this.userType!], 10)
      };
      await this._authService.registerWithEmail({ registerData: newUser, redirect: '/' });
      this._userService.createArtistApplicant(artistApplicant).subscribe();
      this._snackbarService.show({
        message: 'You may now log-in with your email and password (Your application will be reviewed soon).',
        header: 'Registration successful!'
      });
    }
  }
}

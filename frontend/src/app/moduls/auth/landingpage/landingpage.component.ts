import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.sass']
})
export class LandingpageComponent {
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.message = this.getMessage();
  }

  getMessage() {
    return `Logged ${this.authService.isLoggedIn() ? 'out' : 'in'}`;
  }

  login() {
    this.message = 'Trying to log in ...';
    this.authService.currentUser$.subscribe(() => {
      this.message = this.getMessage();
      if (this.authService.isLoggedIn()) {
        const redirectUrl = '/main';
        this.router.navigate([redirectUrl]);
      }
    });
  }

  logout() {
    this.authService.signOut();
    this.message = this.getMessage();
  }
}

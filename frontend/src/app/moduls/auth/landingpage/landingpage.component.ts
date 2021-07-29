import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.sass']
})
export class LandingpageComponent implements OnInit {
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    
    this.message = this.getMessage();
  }
  ngOnInit(): void { }

  getMessage() {
    return 'Logged ' + (this.authService.isLoggedIn ? 'out' : 'in');
  }

  login() {
    this.message = 'Trying to log in ...';

    this.authService.login().subscribe(() => {
      this.message = this.getMessage();
      if (this.authService.isLoggedIn) {
        const redirectUrl = '/main';
        this.router.navigate([redirectUrl]);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.message = this.getMessage();
  }
}

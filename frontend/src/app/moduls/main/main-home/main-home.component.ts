import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.sass']
})
export class MainHomeComponent implements OnInit {
  bar = 1;
  newestCounter: number = 1;
  albums = [{ pic: '../../../assets/album.jpg', name: '1', desc: '1' },
    { pic: '../../../assets/album.jpg', name: '2', desc: '2' },
    { pic: '../../../assets/album.jpg', name: '3', desc: '3' },
    { pic: '../../../assets/album.jpg', name: '4', desc: '4' },
    { pic: '../../../assets/album.jpg', name: '5', desc: '5' }];
  currentAlbum: IAlbum = this.albums[0];
  constructor(private _authService: AuthService) {
  }
  ngOnInit() {
    this.hideProfileMenu();
    this.resizer();
  }
  logout() {
    this._authService.logout();
  }
  resizer() {
    // RESIZER
    this.bar = 1;
  }
  hideProfileMenu() {
    this.bar = 2;
    window.onclick = (event) => {
      if (!(event.target as HTMLElement).matches('.profile')
        && !(event.target as HTMLElement).matches('.avatar')
        && !(event.target as HTMLElement).matches('.icon')) {
        const el = document.getElementById('profile-menu');
        if (el?.classList.contains('show')) {
          el?.classList.remove('show');
        }
      }
    };
  }
  showProfileMenu() {
    this.bar = 2;
    document.getElementById('profile-menu')?.classList.toggle('show');
  }
  nextSlide() {
    MainHomeComponent.accordionAnimation();
    this.currentAlbum = this.albums[this.newestCounter];
    this.newestCounter += 1;
    if (this.newestCounter > 4) {
      this.newestCounter = 0;
    }
  }
  previousSlide() {
    MainHomeComponent.accordionAnimation();
    this.currentAlbum = this.albums[this.newestCounter];
    this.newestCounter -= 1;
    if (this.newestCounter < 0) {
      this.newestCounter = 4;
    }
    MainHomeComponent.accordionAnimation();
  }
  static accordionAnimation() {
    document.getElementsByClassName('accordion-information')[0]?.animate([
      { opacity: '0' },
      { opacity: '1' }
    ], {
      duration: 800
    });
  }
  scroll(id: string) {
    this.bar = 2;
    const el = document.getElementById(id);
    el?.scrollBy({ left: 270, behavior: 'smooth' });
  }
}

interface IAlbum {
  pic: string;
  name: string;
  desc: string
}

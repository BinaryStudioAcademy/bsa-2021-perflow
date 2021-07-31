import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit {
  bar = 1;
  newestCounter: number = 1;
  albums = [{ pic: '../../../assets/album.jpg', name: '1', desc: '1' },
    { pic: '../../../assets/album.jpg', name: '2', desc: '2' },
    { pic: '../../../assets/album.jpg', name: '3', desc: '3' },
    { pic: '../../../assets/album.jpg', name: '4', desc: '4' },
    { pic: '../../../assets/album.jpg', name: '5', desc: '5' }];
  currentAlbum: IAlbum = this.albums[0];
  ngOnInit() {
    this.hideProfileMenu();
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
    MainPageComponent.accordionAnimation();
    this.currentAlbum = this.albums[this.newestCounter];
    this.newestCounter += 1;
    if (this.newestCounter > 4) {
      this.newestCounter = 0;
    }
  }
  previousSlide() {
    MainPageComponent.accordionAnimation();
    this.currentAlbum = this.albums[this.newestCounter];
    this.newestCounter -= 1;
    if (this.newestCounter < 0) {
      this.newestCounter = 4;
    }
    MainPageComponent.accordionAnimation();
  }
  static accordionAnimation() {
    document.getElementsByClassName('accordion-information')[0]?.animate([
      { opacity: '0' },
      { opacity: '1' }
    ], {
      duration: 800
    });
  }
}

interface IAlbum {
  pic: string;
  name: string;
  desc: string
}

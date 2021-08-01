/* eslint-disable class-methods-use-this */
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.sass']
})
export class MainHomeComponent implements OnInit {
  private _newestCounter: number = 1;
  private _newestFiveAlbums = new Array<object>(); // Top 5 the newest albums. it's necessary to add  {{name}} to .html
  public currentNewestAlbum = this._newestFiveAlbums[0];
  public recentlyPlayed = new Array<object>(); // Only 8 items
  public newReleases = new Array<object>();
  public calmRhythms = new Array<object>();
  public yourMix = new Array<object>();
  public top100Songs = new Array<object>();
  constructor(private _authService: AuthService) {
  }
  ngOnInit() {
    this.hideProfileMenu();
    this._newestFiveAlbums = this.getNewestFiveAlbums();
    this.recentlyPlayed = this.getRecentlyPlayed();
    this.newReleases = this.getNewReleases();
    this.calmRhythms = this.getCalmRhythms();
    this.yourMix = this.getYourMix();
    this.top100Songs = this.getTop100Songs();
  }
  logout() {
    this._authService.logout();
  }
  hideProfileMenu() {
    window.onclick = (event) => {
      if (!(event.target as HTMLElement).matches('.profile')
        && !(event.target as HTMLElement).matches('.avatar')
        && !(event.target as HTMLElement).matches('.icon')) {
        const element = document.getElementById('profile_menu');
        if (element?.classList.contains('show')) {
          element?.classList.remove('show');
        }
      }
    };
  }
  showProfileMenu() {
    document.getElementById('profile_menu')?.classList.toggle('show');
  }
  isRightRole(): boolean {
    // Determines if the menu item 'Perflow Studio' will be shown in Profile menu
    // 'Perflow Studio' - available only for artists and moderators
    return false;
  }
  playAlbum() {
    // Ability to play album
  }
  saveAlbum() {
    // Ability to save album - album is saved in the user playlist
  }
  getNewestFiveAlbums(): Array<object> {
    // User should be able to reach Top 5 of the newest albums
    return new Array<object>();
  }
  getRecentlyPlayed(): Array<object> {
    // User should be able to play Recently played - 8 songs/albums/playlists which was played recently
    return new Array<object>();
  }
  getNewReleases(): Array<object> {
    // User should be able to play New Releases - songs/albums which was added to system during last month
    return new Array<object>();
  }
  getCalmRhythms(): Array<object> {
    // User should be able to play Calm rhythms - the newest playlists which moderator creates
    return new Array<object>();
  }
  getYourMix(): Array<object> {
    // User should be able to play Your mix - take songs from all playlists plus liked songs and show in random order
    return new Array<object>();
  }
  getTop100Songs(): Array<object> {
    // User should be able to play Top 100 songs - 100 song ordering by amount of likes by all users
    return new Array<object>();
  }
  nextSlide() {
    MainHomeComponent.accordionAnimation();
    this.currentNewestAlbum = this._newestFiveAlbums[this._newestCounter];
    this._newestCounter += 1;
    if (this._newestCounter > 4) {
      this._newestCounter = 0;
    }
  }
  previousSlide() {
    MainHomeComponent.accordionAnimation();
    this.currentNewestAlbum = this._newestFiveAlbums[this._newestCounter];
    this._newestCounter -= 1;
    if (this._newestCounter < 0) {
      this._newestCounter = 4;
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
    const element = document.getElementById(id);
    element?.scrollBy({ left: 270, behavior: 'smooth' });
  }
}

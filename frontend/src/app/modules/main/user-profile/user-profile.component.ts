import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {
  public isProfileMenuShown: boolean = false;

  private readonly _scrollingSize: number = 270;
  public topArtists = new Array<object>();

  ngOnInit(): void {
    this.topArtists = this.getTopArtists();
  }

  getTopArtists = (): Array<object> => new Array<object>();

  onClickOutsideProfileMenu = (event: Event) => {
    this.isProfileMenuShown = false;
  };

  showProfileMenu = () => {
    this.isProfileMenuShown = !this.isProfileMenuShown;
  };

  logout = () => {

  };

  editProfile = () => {

  };

  isRightRole = () => {

  };
  nextSlide = () => {

  };

  previousSlide = () => {

  };

  scroll = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollBy({ left: this._scrollingSize, behavior: 'smooth' });
  };
}

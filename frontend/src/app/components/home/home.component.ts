import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public isProfileMenuShown: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  onClickOutsideProfileMenu = (event: Event) => {
    this.isProfileMenuShown = false;
  };

  showProfileMenu = () => {
    this.isProfileMenuShown = !this.isProfileMenuShown;
  };

  logout = () => {

  }

  editProfile = () => {

  }

  isRightRole = () => {

  }
  nextSlide = () => {

  }

  previousSlide = () => {

  }

}

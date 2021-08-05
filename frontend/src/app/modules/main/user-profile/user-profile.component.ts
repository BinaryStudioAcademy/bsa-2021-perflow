import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/models/song/song';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {
  public isProfileMenuShown: boolean = false;

  private readonly _scrollingSize: number = 270;
  public topArtists = new Array<object>();

  songs: Song[] = [];

  constructor(
    private _songService: SongsService
  ) {}

  ngOnInit(): void {
    this.topArtists = this.getTopArtists();
    this.loadTopSongs();
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

  loadTopSongs() {
    this._songService.getTopSongs().subscribe(
      (songs) => {
        this.songs = songs;
      }
    );
  }
}

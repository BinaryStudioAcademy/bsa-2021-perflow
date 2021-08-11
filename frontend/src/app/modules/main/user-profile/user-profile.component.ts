import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/models/shared/artist.model';
import { Song } from 'src/app/models/song/song';
import { ArtistsService } from 'src/app/services/artists/artist.service';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {
  public isProfileMenuShown: boolean = false;

  private readonly _scrollingSize: number = 270;

  topArtists : Artist[] = [];
  topSongs: Song[] = [];

  constructor(
    private _songService: SongsService,
    private _artistService: ArtistsService
  ) {}

  ngOnInit(): void {
    this.getTopArtists();
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
        this.topSongs = songs;
      }
    );
  }

  loadTopArtists() {
    this._artistService.getTopArtists().subscribe(
      (artists) => {
        this.topArtists = artists;
      }
    );
  }
}

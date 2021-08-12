import { Component, OnInit } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { Artist } from 'src/app/models/shared/artist.model';
import { Song } from 'src/app/models/song/song';
import { User } from 'src/app/models/user/user';
import { ArtistsService } from 'src/app/services/artists/artist.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SongsService } from 'src/app/services/songs/songs.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {
  public isProfileMenuShown: boolean = false;

  private readonly _scrollingSize: number = 270;

  user: User;
  topArtists: Artist[] = [];
  topSongs: Song[] = [];

  constructor(
    private _songService: SongsService,
    private _artistService: ArtistsService,
    private _authService: AuthService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getTopArtists();
    this.loadTopSongs();
  }

  getUser() {
    this._authService.getAuthStateObservable()
      .pipe(
        filter((state) => state !== null),
        switchMap((state) => this._userService.getUser(state!.id))
      )
      .subscribe((result) => {
        this.user = result;
      });
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

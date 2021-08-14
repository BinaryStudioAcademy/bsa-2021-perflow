import { Component, OnInit } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { Song } from 'src/app/models/song/song';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
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

  user: User = {} as User;
  topArtists: ArtistReadDTO[] = [];
  topSongs: Song[] = [];

  constructor(
    private _songService: SongsService,
    private _artistService: ArtistsService,
    private _authService: AuthService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getTop20Artists();
    this.getTop20Songs();
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

  getTop20Artists() {
    this._artistService.getTopArtistsByLikes(20).subscribe(
      (result) => {
        this.topArtists = result;
      }
    );
  }

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

  getGridScrollWidth = (selector: string) => {
    const element = document.querySelector(selector);
    const style = getComputedStyle(element!);
    const gapWidth = parseInt(style.gridGap.split(' ')[0], 10);
    const elementWidth = parseInt(style.gridTemplateColumns.split(' ')[0], 10);

    return gapWidth + elementWidth;
  };

  scrollGridRight = (id: string, selector: string) => {
    const grid = document.getElementById(id);

    grid?.scrollBy({ left: this.getGridScrollWidth(selector) * 3, behavior: 'smooth' });
  };

  scrollGridLeft = (id: string, selector: string) => {
    const grid = document.getElementById(id);

    grid?.scrollBy({ left: -(this.getGridScrollWidth(selector) * 3), behavior: 'smooth' });
  };

  getTop20Songs() {
    this._songService.getTopSongsByLikes(20).subscribe(
      (songs) => {
        this.topSongs = songs;
      }
    );
  }
}

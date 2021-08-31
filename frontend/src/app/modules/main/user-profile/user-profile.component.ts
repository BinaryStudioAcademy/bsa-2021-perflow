import { Component, OnInit } from '@angular/core';
import { filter, first, switchMap } from 'rxjs/operators';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { Song } from 'src/app/models/song/song';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { User } from 'src/app/models/user/user';
import { ArtistsService } from 'src/app/services/artists/artist.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
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
  private readonly _topAmount = 20;
  private readonly _decimalRadix = 10;
  private readonly _gridScrollMultiplier = 3;

  user: User = {} as User;
  topArtists: ArtistReadDTO[] = [];
  topSongs: Song[] = [];
  myPlaylists: PlaylistView[] = [];

  constructor(
    private _songService: SongsService,
    private _artistService: ArtistsService,
    private _authService: AuthService,
    private _userService: UserService,
    private _playlistsService: PlaylistsService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getTopArtists();
    this.getTopSongs();
  }

  getUser() {
    this._authService.getAuthStateObservableFirst()
      .pipe(
        filter((state) => !!state),
        switchMap((state) => this._userService.getUser(state!.id))
      )
      .subscribe((result) => {
        this.user = result;
        this.getUserCreatedPlaylists();
      });
  }

  public getUserCreatedPlaylists() {
    this._playlistsService
      .getPlaylistsByAuthorId(this.user.id)
      .pipe(first())
      .subscribe(
        (result) => {
          this.myPlaylists = result;
        }
      );
  }

  getTopArtists() {
    this._artistService.getTopArtistsByLikes(this._topAmount).subscribe(
      (result) => {
        this.topArtists = result;
      }
    );
  }

  getTopSongs() {
    this._songService.getTopSongsByLikes(this._topAmount).subscribe(
      (songs) => {
        this.topSongs = songs;
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
    const gapWidth = parseInt(style.gridGap.split(' ')[0], this._decimalRadix);
    const elementWidth = parseInt(style.gridTemplateColumns.split(' ')[0], this._decimalRadix);

    return gapWidth + elementWidth;
  };

  scrollGridRight = (id: string, selector: string) => {
    const grid = document.getElementById(id);

    grid?.scrollBy({ left: this.getGridScrollWidth(selector) * this._gridScrollMultiplier, behavior: 'smooth' });
  };

  scrollGridLeft = (id: string, selector: string) => {
    const grid = document.getElementById(id);

    grid?.scrollBy({ left: -(this.getGridScrollWidth(selector) * this._gridScrollMultiplier), behavior: 'smooth' });
  };
}

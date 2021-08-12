import { Playlist } from 'src/app/models/playlist';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { ReactionService } from 'src/app/services/reaction.service';
import { AlbumView } from 'src/app/models/album/album-view';
import { catchError, filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

/* eslint-disable no-console */

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.sass']
})
export class AllComponent {
  playlists: Playlist[] = [];
  albums: AlbumView[] = [];
  userId: number = 1;
  likedSongs: number = 256;

  constructor(private _reactionService: ReactionService, private _authService: AuthService) {
    this.loadPlaylist();
    this.loadAlbums();
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => state !== null))
      .subscribe((authState) => {
        this.userId = authState!.id;
      });
  }

  loadPlaylist() {
    this._reactionService.getLikedPlaylistsByTheUser(this.userId)
      .pipe(catchError(this._handleError))
      .subscribe((ps) => {
        this.playlists = ps;
      });
  }

  loadAlbums() {
    this._reactionService.getLikedAlbumssByTheUser(this.userId)
      .pipe(catchError(this._handleError))
      .subscribe((as) => {
        this.albums = as;
      });
  }

  private _handleError = (error: HttpErrorResponse) => {
    if (error.status === 0) console.error('An error occurred:', error.error);
    else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  };
}

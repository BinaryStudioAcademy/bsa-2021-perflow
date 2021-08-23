import { Playlist } from 'src/app/models/playlist';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { ReactionService } from 'src/app/services/reaction.service';
import { AlbumView } from 'src/app/models/album/album-view';
import { catchError, filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SongsService } from 'src/app/services/songs/songs.service';

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
  likedSongs: number;

  constructor(
    private _reactionService: ReactionService,
    private _authService: AuthService,
    private _songsService: SongsService
  ) {
    this._authService.getAuthStateObservableFirst()
      .pipe(filter((state) => !!state))
      .subscribe((authState) => {
        this.userId = authState!.id;
      });
    this._songsService.getLikedSongsCount().subscribe(
      (count) => {
        this.likedSongs = count;
      }
    );
    this.loadPlaylist();
    this.loadAlbums();
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

  deletePlaylist(id: number) {
    this._reactionService.removePlaylistReaction(id, this.userId).subscribe(
      () => {
        const index = this.playlists.findIndex((p) => p.id === id);
        this.playlists.splice(index, 1);
      }
    );
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

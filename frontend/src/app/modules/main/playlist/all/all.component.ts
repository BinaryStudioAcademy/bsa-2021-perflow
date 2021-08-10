import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlbumView } from 'src/app/models/album/album-view';
import { Playlist } from 'src/app/models/playlist';
import { ReactionService } from 'src/app/services/reaction.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.sass']
})
export class AllComponent {
  playlists: Playlist[] = [];
  albums: AlbumView[] = [];
  userId: number = 1;

  constructor(private _reactionService: ReactionService) {
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

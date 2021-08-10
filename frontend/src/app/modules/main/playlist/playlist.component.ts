import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Playlist } from 'src/app/models/playlist';
import { HttpInternalService } from 'src/app/services/http-internal.service';

/* eslint-disable no-console */

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.sass']
})
export class PlaylistComponent {
  playlists: Playlist[] = [];

  constructor(private _httpService: HttpInternalService) {
    this.loadPlaylist();
  }

  loadPlaylist() {
    this._httpService.getRequest<Playlist[]>('/api/playlists')
      .pipe(catchError(this._handleError))
      .subscribe((ps) => {
        this.playlists = ps;
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

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Album } from 'src/app/models/album/album';
import { Playlist } from 'src/app/models/playlist';
import { PlaylistService } from 'src/app/services/playlist-service.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.sass']
})
export class AllComponent {
  playlists: Playlist[] = [];
  albums: Album[] = [];

  constructor(private _playlistService: PlaylistService) {
    this.loadPlaylist();
  }

  loadPlaylist() {
    this._playlistService.getAllPlaylists()
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

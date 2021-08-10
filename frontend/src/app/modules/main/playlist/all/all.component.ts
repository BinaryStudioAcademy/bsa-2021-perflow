import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlbumView } from 'src/app/models/album/album-view';
import { Playlist } from 'src/app/models/playlist';
import { AlbumService } from 'src/app/services/album.service';
import { PlaylistService } from 'src/app/services/playlist-service.service';

/* eslint-disable no-console */

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.sass']
})
export class AllComponent {
  playlists: Playlist[] = [];
  albums: AlbumView[] = [];

  constructor(private _playlistService: PlaylistService,
    private _albumService: AlbumService) {
    this.loadPlaylist();
    this.loadAlbums();
  }

  loadPlaylist() {
    this._playlistService.getAllPlaylists()
      .pipe(catchError(this._handleError))
      .subscribe((ps) => {
        this.playlists = ps;
      });
  }

  loadAlbums() {
    this._albumService.getAllAlbums()
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

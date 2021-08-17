import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { throwError } from 'rxjs';
import { SongToolbarService } from 'src/app/services/song-toolbar.service';
import { SongsService } from 'src/app/services/songs/songs.service';
import { SongImageComponent } from '../../shared/upload/song-image/song-image.component';

/* eslint-disable no-console */

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.sass']
})
export class PlaylistComponent {
  toolbarService: SongToolbarService;
  songsService: SongsService;

  @ViewChild(SongImageComponent)
  upload: SongImageComponent;

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

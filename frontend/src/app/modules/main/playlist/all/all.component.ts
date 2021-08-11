import { Playlist } from 'src/app/models/playlist';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AlbumView } from 'src/app/models/album/album-view';
// import { Playlist } from 'src/app/models/playlist';
import { ReactionService } from 'src/app/services/reaction.service';
import { MockAlbum } from './mock-album';

/* eslint-disable no-console */

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.sass']
})
export class AllComponent {
  // playlists: Playlist[] = [];
  // albums: AlbumView[] = [];
  userId: number = 1;
  likedSongs: number = 256;

  mockPlaylist: Playlist[] = new Array<Playlist>(24).fill(
    {
      id: 0,
      createdAt: new Date(),
      name: 'Fresh & Chill',
      description: 'Ed Sheeran, Paloma Mami Maroon 5, SigalaPink, Oximer, Paloma Mami Maroon 5, SigalaPink, Oximer',
      iconURL: '../../../../../assets/images/mix-6.png',
      author: undefined
    }
  );

  mockAlbums: MockAlbum[] = new Array<MockAlbum>(4).fill(
    {
      name: 'Fresh & Chill',
      description: 'Ed Sheeran, Paloma Mami Maroon 5, SigalaPink, Oximer, Paloma Mami Maroon 5, SigalaPink, Oximer',
      iconURL: '../../../../../assets/images/mix-4.jpg'
    }
  );

  constructor(private _reactionService: ReactionService) {
    this.loadPlaylist();
    this.loadAlbums();
  }

  // eslint-disable-next-line class-methods-use-this
  loadPlaylist() {
    // this._reactionService.getLikedPlaylistsByTheUser(this.userId)
    //   .pipe(catchError(this._handleError))
    //   .subscribe((ps) => {
    //     this.playlists = ps;
    //   });
  }

  // eslint-disable-next-line class-methods-use-this
  loadAlbums() {
    // this._reactionService.getLikedAlbumssByTheUser(this.userId)
    //   .pipe(catchError(this._handleError))
    //   .subscribe((as) => {
    //     this.albums = as;
    //   });
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

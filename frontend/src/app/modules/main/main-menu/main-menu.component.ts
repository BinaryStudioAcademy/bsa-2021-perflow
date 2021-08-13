import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Playlist } from 'src/app/models/playlist/playlist';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { MOCKPLAYLIST } from './mock-playlist';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass']
})
export class MainMenuComponent implements OnDestroy, OnInit {
  // TODO: Tempolary array
  mockPlaylists: MOCKPLAYLIST[] = [
    {
      id: 1,
      name: 'Rock'
    },
    {
      id: 2,
      name: 'Almost the Beatles'
    },
    {
      id: 3,
      name: 'JohnLennon'
    }
  ];

  playlists: string[] = [];

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _playlistsService: PlaylistsService,
    private _authService: AuthService
  ) {
  }

  public ngOnInit() {
    this.getUserCreatedPlaylists();
  }

  public ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public async getUserCreatedPlaylists() {
    this._playlistsService
      .getUserCreatedPlaylists()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (resp: HttpResponse<Playlist[]>) => {
          this.playlists = resp.body!.map((el) => el.name);
        }
      );
  }

  public createPlaylist = () => { };
}

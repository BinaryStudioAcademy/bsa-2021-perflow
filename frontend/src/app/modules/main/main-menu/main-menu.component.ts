import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Playlist } from 'src/app/models/playlist/playlist';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass']
})
export class MainMenuComponent implements OnDestroy, OnInit {
  // TODO: Tempolary array
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
    let token: string;
    this._authService.getAuthStateObservable()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (resp) => {
          token = resp!.firebaseId;
          console.log(token);
          this._playlistsService
            .getUserCreatedPlaylists(token)
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe(
              (resp1: HttpResponse<Playlist[]>) => {
                this.playlists = resp1.body!.map((el) => el.name);
              }
            );
        }
      );
  }

  public createPlaylist = () => { };
}

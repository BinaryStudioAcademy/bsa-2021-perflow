import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PlaylistName } from 'src/app/models/playlist/playlist-name';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { CreatePlaylistService } from '../../shared/playlist/create-playlist/create-playlist.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass']
})
export class MainMenuComponent implements OnDestroy, OnInit {
  playlists: PlaylistName[] = [];

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _playlistsService: PlaylistsService,
    private _authService: AuthService,
    private _createdPlaylistService: CreatePlaylistService
  ) {
  }

  public ngOnInit() {
    this.getUserCreatedPlaylists();

    this._createdPlaylistService.playlistChanged$.subscribe((playlist) => {
      const playlistIndex = this.playlists.findIndex((pl) => pl.id === playlist?.id);
      if (playlistIndex === -1) {
        this.playlists.push(playlist!);
      }
      else {
        this.playlists[playlistIndex] = playlist!;
      }
    });

    this._createdPlaylistService.playlistDeleted$
      .subscribe((id) => {
        this.playlists = this.playlists.filter((pl) => pl.id !== id);
      });
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
        (resp: HttpResponse<PlaylistName[]>) => {
          this.playlists = resp.body!;
        }
      );
  }

  public createPlaylist = () => { };
}

import { HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Playlist } from 'src/app/models/playlist/playlist';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass']
})
export class MainMenuComponent implements OnDestroy, OnInit{
  // TODO: Tempolary array
  playlists: string[] = [];
  
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _playlistsService: PlaylistsService) {
  }

  public ngOnInit(){
    this.getUserPlaylists();
  }

  public ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  public getUserPlaylists() {
    this._playlistsService
      .getPlaylists()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (resp: HttpResponse<Playlist[]>) => {
          this.playlists = resp.body!.map((el) => el.name)
        }
      );
  }

  public createPlaylist = () => { };
}

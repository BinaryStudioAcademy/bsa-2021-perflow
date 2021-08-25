import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';

@Component({
  selector: 'app-playlists-page',
  templateUrl: './playlists-page.component.html',
  styleUrls: ['./playlists-page.component.sass']
})
export class PlaylistsPageComponent {
  playlists: PlaylistView[] = [];
  userId: number = 1;

  constructor(
    private _authService: AuthService,
    private _playlistService: PlaylistsService
  ) {
    this._authService.getAuthStateObservableFirst()
      .pipe(filter((state) => !!state))
      .subscribe((authState) => {
        this.userId = authState!.id;
      });

    this.loadPlaylist();
  }

  loadPlaylist() {
    this._playlistService.getPlaylistsByAuthorId(this.userId)
      .subscribe((ps) => {
        this.playlists = ps;
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { filter, first } from 'rxjs/operators';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlaylistEditorsService } from 'src/app/services/playlists/playlist-editors.service';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';

@Component({
  selector: 'app-playlists-page',
  templateUrl: './playlists-page.component.html',
  styleUrls: ['./playlists-page.component.sass']
})
export class PlaylistsPageComponent implements OnInit {
  playlists: PlaylistView[] = [];
  collaborativePlaylists: PlaylistView[] = [];
  userId: number = -1;

  constructor(
    private _authService: AuthService,
    private _playlistService: PlaylistsService,
    private _playlistEditorsService: PlaylistEditorsService
  ) {
  }

  ngOnInit(): void {
    this._authService.getAuthStateObservableFirst()
      .pipe(filter((state) => !!state))
      .subscribe((authState) => {
        this.userId = authState!.id;
      });

    this.loadPlaylist();
  }

  loadPlaylist() {
    this._playlistService.getPlaylistsByAuthorId(this.userId)
    .pipe(first())
    .subscribe((ps) => {
      this.playlists = ps;
      this.loadCollaborativePlaylists();
    });
  }

  loadCollaborativePlaylists() {
    this._playlistEditorsService.getCollaborativePlaylists(this.userId)
    .pipe(first())
    .subscribe(
      reuslt => {
        this.collaborativePlaylists = reuslt.filter(p => !this.isByThisAuthor(p.id));
      }
    )
  }

  isByThisAuthor(playlistId: number) {
    return this.playlists.find(p => p.id === playlistId) !== undefined;
  }
}

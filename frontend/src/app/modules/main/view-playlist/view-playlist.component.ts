import { Playlist } from 'src/app/models/playlist/playlist';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Song } from 'src/app/models/song/song';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { ReactionService } from 'src/app/services/reaction.service';

@Component({
  selector: 'app-view-playlist',
  templateUrl: './view-playlist.component.html',
  styleUrls: ['./view-playlist.component.sass']
})
export class ViewPlaylistComponent implements OnInit {
  public songs: Song[] = [];
  public userId: number;
  public totalCountSongs: number;
  public hours: number;
  public minutes: number;
  public playlist: Playlist;
  private _totalTimeSongs: number;
  private _playlistId: number;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _authService: AuthService,
    private _reactionService: ReactionService,
    private _playlistsService: PlaylistsService
  ) { }

  ngOnInit() {
    this._activateRoute.params.subscribe((params: Params) => {
      this._playlistId = params.id;
      this.loadPlaylistSongs();
      this.loadPlaylist();
    });
    this.getUserId();
  }

  nextSlide = () => {};

  previousSlide = () => {};

  getUserId() {
    this._authService
      .getAuthStateObservable()
      .pipe(filter((state) => state !== null))
      .subscribe((authState) => {
        this.userId = authState!.id;
      });
  }

  dislikeSong(songId: number) {
    this._reactionService.removeLike(songId, this.userId).subscribe({
      next: () => {
        this.songs = this.songs.filter((s) => s.id !== songId);
      }
    });
  }

  play = () => {};

  loadPlaylistSongs() {
    this._playlistsService
      .getPlaylistSongs(this._playlistId)
      .subscribe((songs) => {
        this.songs = songs;
        this.totalCountSongs = songs.length;
        this._totalTimeSongs = songs
          .filter((s) => s.duration > 0)
          .reduce((sum, current) => sum + current.duration, 0);
        this.hours = Math.round(this._totalTimeSongs / 60 / 60);
        this.minutes = Math.round(this._totalTimeSongs / 60 - this.hours * 60);
      });
  }

  loadPlaylist() {
    this._playlistsService
      .getPlaylist(this._playlistId)
      .subscribe((playlist) => {
        this.playlist = playlist;
      });
  }
}

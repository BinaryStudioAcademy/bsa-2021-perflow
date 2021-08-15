import { Playlist } from 'src/app/models/playlist/playlist';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Song } from 'src/app/models/song/song';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { filter } from 'rxjs/operators';

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
  public playlist: Playlist = {} as Playlist;
  private _totalTimeSongs: number;
  private _playlistId: number;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _playlistsService: PlaylistsService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _reactionService: ReactionService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this._activateRoute.params.subscribe((params: Params) => {
      this._playlistId = params.id;
      this.loadPlaylist();
      this.loadPlaylistSongs();
    });
    this.getUserId();
  }

  nextSlide = () => { };

  previousSlide = () => { };

  play = () => { };

  getUserId() {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => !!state))
      .subscribe(
        (state) => {
          this.userId = state!.id;
        }
      );
  }

  loadPlaylistSongs() {
    this._playlistsService
      .getPlaylistSongs(this._playlistId)
      .subscribe((songs) => {
        this.songs = songs;
        this.totalCountSongs = songs.length;
        this._totalTimeSongs = songs
          .filter((s) => s.duration > 0)
          .reduce((sum, current) => sum + current.duration, 0);
        const hour = 3600;
        const minute = 60;
        this.hours = Math.floor(this._totalTimeSongs / hour);
        this.minutes = Math.floor(((this._totalTimeSongs % hour) / minute));
      });
  }

  loadPlaylist() {
    this._playlistsService
      .getPlaylist(this._playlistId)
      .subscribe((playlist) => {
        this.playlist = playlist;
      });
  }

  dislikePlaylist(playlistId: number) {
    this._reactionService.removePlaylistReaction(playlistId, this.userId)
      .subscribe(
        () => {
          this.playlist.isLiked = false;
        }
      );
  }

  likePlaylist(playlistId: number) {
    this._reactionService.addPlaylistReaction(playlistId, this.userId)
      .subscribe(
        () => {
          this.playlist.isLiked = true;
        }
      );
  }

  deletePlaylist() {
    this._playlistsService.deletePlaylist(this.playlist.id)
      .subscribe({
        next: (data) => {
          this._router.navigateByUrl('/playlists/all');
          this._router.dispose();
        }
      });
  }
}

import { Playlist } from 'src/app/models/playlist/playlist';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Song } from 'src/app/models/song/song';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';

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
    private _playlistsService: PlaylistsService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._activateRoute.params.subscribe((params: Params) => {
      this._playlistId = params.id;
      this.loadPlaylistSongs();
      this.loadPlaylist();
    });
  }

  nextSlide = () => {};

  previousSlide = () => {};

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

import {
  Component, ElementRef, OnInit, ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { Song } from 'src/app/models/song/song';
import { ArtistFull } from 'src/app/models/user/artist-full';
import { ArtistService } from 'src/app/services/artist.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
import { QueueService } from 'src/app/services/queue.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.sass']
})
export class ArtistDetailsComponent implements OnInit {
  private readonly _scrollingSize: number = 240;
  private _userId: number;

  @ViewChild('albums') albumsElement: ElementRef;
  @ViewChild('playlists') playlistsElement: ElementRef;

  artist: ArtistFull = {} as ArtistFull;
  topSongs: Song[] = [];
  artistPlaylists: PlaylistView[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _artistService: ArtistService,
    private _songService: SongsService,
    private _playlistsService: PlaylistsService,
    private _queueService: QueueService,
    private _reactionService: ReactionService,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.loadData();
    this.getUserId();
  }

  getUserId() {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => !!state))
      .subscribe(
        (state) => {
          this._userId = state!.id;
        }
      );
  }

  loadData() {
    const artistId = this._route.snapshot.params.id;

    this._artistService.getArtist(artistId)
      .subscribe(
        (result) => {
          this.artist = result;
          this.loadTopSongs();
          this.loadPlaylists();
        }
      );
  }

  loadTopSongs() {
    this._songService.getTopSongsByAuthorId(this.artist.id, 10)
      .subscribe(
        (result) => {
          this.topSongs = result;
        }
      );
  }

  loadPlaylists() {
    this._playlistsService.getPlaylistsByAuthorId(this.artist.id)
      .subscribe(
        (result) => {
          this.artistPlaylists = result;
        }
      );
  }

  likeArtist() {
    this._reactionService.addArtistReaction(this.artist.id, this._userId)
      .subscribe(
        () => {
          this.artist.isLiked = true;
        }
      );
  }

  dislikeArtist() {
    this._reactionService.removeArtistReaction(this.artist.id, this._userId)
      .subscribe(
        () => {
          this.artist.isLiked = false;
        }
      );
  }

  scroll(id: string, scrollingSize: number = this._scrollingSize) {
    switch (id) {
      case 'albums':
        this.albumsElement.nativeElement?.scrollBy({ left: scrollingSize, behavior: 'smooth' });
        break;
      case 'playlists':
        this.playlistsElement.nativeElement?.scrollBy({ left: scrollingSize, behavior: 'smooth' });
        break;
      default:
        break;
    }
  }

  playArtist = () => {
    if (this.topSongs.length === 0) return;

    this._queueService.clearQueue();
    this._queueService.addSongsToQueue(this.topSongs);

    this._queueService.initSong(this.topSongs[0], true);
  };

  addToQueue = () => {
    if (this.topSongs.length === 0) return;

    if (!QueueService.isInitialized) this._queueService.initSong(this.topSongs[0]);
  };
}

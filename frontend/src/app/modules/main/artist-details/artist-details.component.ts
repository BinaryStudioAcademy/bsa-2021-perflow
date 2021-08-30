import { PlatformLocation } from '@angular/common';
import {
  Component, OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { timer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { AuthorType } from 'src/app/models/enums/author-type.enum';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { Song } from 'src/app/models/song/song';
import { ArtistFull } from 'src/app/models/user/artist-full';
import { AlbumService } from 'src/app/services/album.service';
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
  private _userId: number;
  private readonly _decimalRadix = 10;
  private readonly _gridScrollMultiplier = 3;

  artist: ArtistFull = {} as ArtistFull;
  topSongs: Song[] = [];
  artistPlaylists: PlaylistView[] = [];
  isSuccess: boolean = false;
  artistAlbums: AlbumForReadDTO[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _artistService: ArtistService,
    private _songService: SongsService,
    private _playlistsService: PlaylistsService,
    private _queueService: QueueService,
    private _clipboardApi: ClipboardService,
    private _location: PlatformLocation,
    private _reactionService: ReactionService,
    private _authService: AuthService,
    private _albumsService: AlbumService
  ) {
    _route.params.subscribe(() => {
      this.loadData();
    });
  }

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
          this.loadAlbums();
        }
      );
  }

  loadTopSongs() {
    this._songService.getTopSongsByAuthorId(this.artist.id, 10, AuthorType.artist)
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

  loadAlbums() {
    this._albumsService.getAlbumsByArtist(this.artist.id, AuthorType.artist)
      .subscribe(
        (result) => {
          this.artistAlbums = result;
        }
      );
  }

  playArtist = () => {
    if (!this.topSongs.length) {
      return;
    }

    this._queueService.clearQueue();
    this._queueService.addSongsToQueue(this.topSongs);

    const [first] = this.topSongs;

    this._queueService.initSong(first, true);
  };

  addToQueue = () => {
    if (!this.topSongs.length) {
      return;
    }

    if (!QueueService.isInitialized) {
      const [first] = this.topSongs;
      this._queueService.initSong(first);
    }
  };

  copyLink() {
    this._clipboardApi.copyFromContent(this._location.href);
    this.isSuccess = true;
    timer(3000).subscribe((val) => {
      this.isSuccess = Boolean(val);
    });
  }

  getGridScrollWidth = (selector: string) => {
    const element = document.querySelector(selector);
    const style = getComputedStyle(element!);
    const gapWidth = parseInt(style.gridGap.split(' ')[0], this._decimalRadix);
    const elementWidth = parseInt(style.gridTemplateColumns.split(' ')[0], this._decimalRadix);

    return gapWidth + elementWidth;
  };

  scrollGridRight = (id: string, selector: string) => {
    const grid = document.getElementById(id);

    grid?.scrollBy({ left: this.getGridScrollWidth(selector) * this._gridScrollMultiplier, behavior: 'smooth' });
  };

  scrollGridLeft = (id: string, selector: string) => {
    const grid = document.getElementById(id);

    grid?.scrollBy({ left: -(this.getGridScrollWidth(selector) * this._gridScrollMultiplier), behavior: 'smooth' });
  };
}

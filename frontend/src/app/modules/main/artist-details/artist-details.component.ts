import { PlatformLocation } from '@angular/common';
import {
  Component, ElementRef, OnInit, ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { filter } from 'rxjs/operators';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { Song } from 'src/app/models/song/song';
import { ArtistFull } from 'src/app/models/user/artist-full';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlaylistsService } from 'src/app/services/playlists/playlist.service';
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
  isSuccess: boolean = false;
  artistAlbums: AlbumForReadDTO[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _artistService: ArtistService,
    private _songService: SongsService,
    private _playlistsService: PlaylistsService,
    private _clipboardApi: ClipboardService,
    private _location: PlatformLocation,
    private _reactionService: ReactionService,
    private _authService: AuthService,
    private _albumsService: AlbumService
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
          this.loadAlbums();
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

  loadAlbums() {
    this._albumsService.getAlbumsByArtist(this.artist.id)
      .subscribe(
        (result) => {
          this.artistAlbums = result;
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

  copyLink() {
    this._clipboardApi.copyFromContent(this._location.href);
    this.isSuccess = true;

    setTimeout(() => {
      this.isSuccess = false;
    }, 3000);
  }
}

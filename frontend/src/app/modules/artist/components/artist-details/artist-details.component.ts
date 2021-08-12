import {
  Component, ElementRef, OnInit, ViewChild
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { Song } from 'src/app/models/song/song';
import { Artist } from 'src/app/models/user/artist';
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

  artist: Artist = {} as Artist;
  topSongs: Song[] = [];
  artistPlaylists: PlaylistView[] = [];

  constructor(private _route: ActivatedRoute, private _artistService: ArtistService, private _songService: SongsService,
    private _playlistsService: PlaylistsService, private _reactionService: ReactionService,
    private _authService: AuthService) { }

  ngOnInit() {
    this.loadData();
    this. getUserId();
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

  getUserId() {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => !!state))
      .subscribe(
        (state) => {
          this._userId = state!.id
        });
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

  dislikeSong(songId: number) {
    this._reactionService.removeLike(songId, this._userId).subscribe();
  }

  likeSong(songId: number) {
    this._reactionService.likeSong(songId, this._userId).subscribe();
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
}

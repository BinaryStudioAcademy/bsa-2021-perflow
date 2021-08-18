import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, takeUntil
} from 'rxjs/operators';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { Song } from 'src/app/models/song/song';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { SongsService } from 'src/app/services/songs/songs.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit, OnDestroy {
  readonly amountOfFoundItems: number = 8;

  songs: Array<Song> = new Array<Song>();
  albums: Array<AlbumForReadDTO> = new Array<AlbumForReadDTO>();
  artists: Array<ArtistReadDTO> = new Array<ArtistReadDTO>();
  playlists: Array<PlaylistView> = new Array<PlaylistView>();

  searchValue: string;

  private _searchTerms$ = new Subject<string>();
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _songService: SongsService,
    private _searchService: SearchService
  ) {}

  ngOnInit() {
    this.setSongsSearch();
    this.setArtistsSearch();
    this.setAlbumsSearch();
    this.setPlaylistsSearch();
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  setSongsSearch() {
    this._searchTerms$.pipe(
      takeUntil(this._unsubscribe$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this._songService.getSongsByName(term))
    ).subscribe({
      next: (data) => {
        this.songs = data.filter((u, i) => i < 4);
      }
    });
  }

  setArtistsSearch() {
    this._searchTerms$.pipe(
      takeUntil(this._unsubscribe$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this._searchService.getArtistByName(
        { searchTerm: term, amount: this.amountOfFoundItems }
      ))
    ).subscribe({
      next: (data) => {
        this.artists = data;
      }
    });
  }

  setAlbumsSearch() {
    this._searchTerms$.pipe(
      takeUntil(this._unsubscribe$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this._searchService.getAlbumsByName(
        { searchTerm: term, amount: this.amountOfFoundItems }
      ))
    ).subscribe({
      next: (data) => {
        this.albums = data;
      }
    });
  }

  setPlaylistsSearch() {
    this._searchTerms$.pipe(
      takeUntil(this._unsubscribe$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this._searchService.getPlaylistsByName(
        { searchTerm: term, amount: this.amountOfFoundItems }
      ))
    ).subscribe({
      next: (data) => {
        this.playlists = data;
      }
    });
  }

  findSongsByName() {
    if (this.searchValue.trim() !== '') {
      this._searchTerms$.next(this.searchValue);
    }
    else {
      this.songs = [];
    }
  }

  clearSearch(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchValue = '';
      this.songs = new Array<Song>();
    }
  }
}

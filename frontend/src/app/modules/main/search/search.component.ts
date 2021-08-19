import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, takeUntil
} from 'rxjs/operators';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { Song } from 'src/app/models/song/song';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit, OnDestroy {
  readonly amountOfFoundItems: number = 8;
  readonly amountOfFoundSongs: number = 4;
  readonly debounceTime: number = 750;

  songs: Array<Song> = new Array<Song>();
  albums: Array<AlbumForReadDTO> = new Array<AlbumForReadDTO>();
  artists: Array<ArtistReadDTO> = new Array<ArtistReadDTO>();
  playlists: Array<PlaylistView> = new Array<PlaylistView>();

  searchValue: string;

  private readonly _regex = new RegExp('search.*');
  private _searchTerms$ = new Subject<string>();
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _searchService: SearchService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.setSearch();

    this._activatedRoute.paramMap.pipe(
      switchMap((params) => params.getAll('term'))
    ).subscribe((data) => {
      this.searchValue = data;
      this._searchTerms$.next(data);
    });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  setSearch() {
    this._searchTerms$.pipe(
      takeUntil(this._unsubscribe$),
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      switchMap((term: string) => this._searchService.getFoundData(term))
    ).subscribe({
      next: (data) => {
        this.songs = data.songs;
        this.albums = data.albums;
        this.artists = data.artists;
        this.playlists = data.playlists;
      }
    });
  }

  findSongsByName() {
    if (this.searchValue.trim() !== '') {
      this._searchTerms$.next(this.searchValue);
      this._location.replaceState(this._router.url.replace(this._regex, `search/${this.searchValue}`));
    }
    else {
      this.songs = [];
    }
  }

  clearSearch(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchValue = '';
      this.songs = new Array<Song>();
      this.albums = new Array<AlbumForReadDTO>();
      this.artists = new Array<ArtistReadDTO>();
      this.playlists = new Array<PlaylistView>();

      this._location.replaceState(this._router.url.replace(this._regex, 'search'));
    }
  }
}

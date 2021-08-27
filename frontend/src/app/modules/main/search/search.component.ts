import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, take, takeUntil
} from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FoundData } from 'src/app/models/search/found-data';
import { SearchHistoryService } from 'src/app/services/search-history.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReadSearchHistory } from 'src/app/models/search/read-search-history';
import { WriteSearchHistory } from 'src/app/models/search/write-search-history';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit, OnDestroy {
  readonly amountOfFoundItems: number = 8;
  readonly amountOfFoundSongs: number = 4;
  readonly debounceTime: number = 750;

  foundData = {} as FoundData;
  searchValue: string;
  searchHistory = new Array<ReadSearchHistory>();
  isSearchHistoryShown: boolean = false;

  private readonly _regex = new RegExp('search.*');
  private _searchTerms$ = new Subject<string>();
  private _unsubscribe$ = new Subject<void>();
  private _userId: number;

  constructor(
    private _searchService: SearchService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _searchHistoryService: SearchHistoryService,
    private _authService: AuthService
  ) {
    this._authService.getAuthStateObservable()
      .pipe(take(1))
      .subscribe((authState) => {
        this._userId = authState!.id;
      });
  }

  ngOnInit() {
    this.setSearch();

    this._activatedRoute.paramMap.pipe(
      switchMap((params) => params.getAll('term'))
    ).pipe(take(1))
      .subscribe((data) => {
        this.searchValue = data;
        this._searchTerms$.next(data);
      });

    if (!this.searchValue) {
      this.getUserSearchHistory();
    }
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  getUserSearchHistory() {
    this._searchHistoryService.getUserSearchHistory(this._userId)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this.searchHistory = data;
          this.isSearchHistoryShown = !!data.length;
        }
      });
  }

  setSearch() {
    this._searchTerms$.pipe(
      takeUntil(this._unsubscribe$),
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (term) {
          return this._searchService.getFoundData(term);
        }
        return of({} as FoundData);
      })
    ).subscribe({
      next: (data) => {
        if (data.albums?.length || data.artists?.length || data.playlists?.length || data.songs?.length) {
          this.foundData = data;
          this.isSearchHistoryShown = false;
        }
        else {
          this.foundData = {} as FoundData;
        }
      }
    });
  }

  findSongsByName() {
    this._location.replaceState(this._router.url.replace(this._regex, `search/${this.searchValue}`));

    if (this.searchValue.trim()) {
      this._searchTerms$.next(this.searchValue);
      return;
    }
    this.getUserSearchHistory();
    this._searchTerms$.next();
  }

  clearSearch(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchValue = '';
      this.foundData = {} as FoundData;
      this._location.replaceState(this._router.url.replace(this._regex, 'search'));
      this.getUserSearchHistory();
    }
  }

  saveAlbumToSearchHistory = (album: AlbumForReadDTO) => {
    const history = {
      userId: this._userId,
      albumId: album.id
    } as WriteSearchHistory;

    this.writeSearchHistory(history);
  };

  saveArtistToSearchHistory = (artist: ArtistReadDTO) => {
    const history = {
      userId: this._userId,
      artistId: artist.id
    } as WriteSearchHistory;

    this.writeSearchHistory(history);
  };

  savePlaylistToSearchHistory = (playlist: PlaylistView) => {
    const history = {
      userId: this._userId,
      playlistId: playlist.id
    } as WriteSearchHistory;

    this.writeSearchHistory(history);
  };

  writeSearchHistory(history: WriteSearchHistory) {
    this._searchHistoryService.addSearchHistory(history)
      .pipe(take(1)).subscribe();
  }
}

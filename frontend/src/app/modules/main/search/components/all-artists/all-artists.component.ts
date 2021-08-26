import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { SearchParam } from 'src/app/models/search/search-param';
import { WriteSearchHistory } from 'src/app/models/search/write-search-history';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SearchHistoryService } from 'src/app/services/search-history.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-all-artists',
  templateUrl: './all-artists.component.html',
  styleUrls: ['./all-artists.component.sass']
})
export class AllArtistsComponent implements OnInit, OnDestroy {
  artists: Array<ArtistReadDTO> = Array<ArtistReadDTO>();
  searchTerm: string = '';

  private _unsubscribe$ = new Subject<void>();
  private _userId: number;

  // for Infinity Scrolling
  public throttle: number = 300;
  public distance: number = 5;
  private _page: number = 0;
  private _itemsOnPage: number = 5;

  private _query = {
    searchTerm: this.searchTerm,
    page: this._page += 1,
    itemsOnPage: this._itemsOnPage
  } as SearchParam;

  constructor(
    private _searchService: SearchService,
    private _activatedRoute: ActivatedRoute,
    private _searchHistoryService: SearchHistoryService,
    private _authService: AuthService
  ) {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => !!state))
      .subscribe((authState) => {
        this._userId = authState!.id;
      });
  }

  ngOnInit() {
    this._activatedRoute.paramMap.pipe(
      switchMap((params) => params.getAll('term'))
    ).subscribe((data) => {
      this._query = {
        ...this._query,
        searchTerm: data
      };

      this.searchTerm = data;
    });

    this.getArtistByName(this._query);
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onScroll() {
    this._query = {
      ...this._query,
      page: this._query.page += 1
    };

    this.getArtistByName(this._query);
  }

  getArtistByName(query: SearchParam) {
    this._searchService.getArtistByName(query)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (result) => {
          this.artists = [...this.artists, ...result];
        }
      });
  }

  saveToSearchHistory = (artist: ArtistReadDTO) => {
    const history = {
      userId: this._userId,
      artistId: artist.id
    } as WriteSearchHistory;

    this._searchHistoryService.addSearchHistory(history)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: () => {}
      });
  };
}

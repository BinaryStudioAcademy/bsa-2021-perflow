import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, filter, switchMap, takeUntil
} from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FoundData } from 'src/app/models/search/found-data';
import { SearchHistoryService } from 'src/app/services/search-history.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReadSearchHistory } from 'src/app/models/search/read-search-history';

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
      .pipe(filter((state) => !!state))
      .subscribe((authState) => {
        this._userId = authState!.id;
      });
  }

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

  getUserSearchHistory() {
    this._searchHistoryService.getUserSearchHistory(this._userId)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this.searchHistory = data;
        }
      });
  }

  setSearch() {
    this._searchTerms$.pipe(
      takeUntil(this._unsubscribe$),
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      switchMap((term: string) => this._searchService.getFoundData(term))
    ).subscribe({
      next: (data) => {
        this.foundData = data;
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
    }
  }
}

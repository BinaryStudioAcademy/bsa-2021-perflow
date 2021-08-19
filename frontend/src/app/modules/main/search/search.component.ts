import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, takeUntil
} from 'rxjs/operators';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FoundData } from 'src/app/models/search/found-data';

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
        this.foundData = data;
      }
    });
  }

  findSongsByName() {
    if (this.searchValue.trim() !== '') {
      this._searchTerms$.next(this.searchValue);
      this._location.replaceState(this._router.url.replace(this._regex, `search/${this.searchValue}`));
    }
  }

  clearSearch(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchValue = '';
      this.foundData = {} as FoundData;
      this._location.replaceState(this._router.url.replace(this._regex, 'search'));
    }
  }
}

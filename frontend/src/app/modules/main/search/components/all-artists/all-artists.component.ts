import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SearchParam } from 'src/app/models/search/search-param';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
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
    private _activatedRoute: ActivatedRoute
  ) { }

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
}

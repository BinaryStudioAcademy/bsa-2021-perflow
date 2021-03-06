import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { SearchParam } from 'src/app/models/search/search-param';
import { WriteSearchHistory } from 'src/app/models/search/write-search-history';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SearchHistoryService } from 'src/app/services/search-history.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-all-albums',
  templateUrl: './all-albums.component.html',
  styleUrls: ['./all-albums.component.sass']
})
export class AllAlbumsComponent implements OnInit, OnDestroy {
  albums: Array<AlbumForReadDTO> = new Array<AlbumForReadDTO>();
  searchTerm: string = '';

  private _unsubscribe$ = new Subject<void>();

  // for Infinity Scrolling
  public throttle: number = 300;
  public distance: number = 3;
  private _page: number = 0;
  private _itemsOnPage: number = 15;
  private _userId: number;

  private _query = {
    searchTerm: this.searchTerm,
    page: this._page += 1,
    itemsOnPage: this._itemsOnPage
  } as SearchParam;

  constructor(
    private _searchService: SearchService,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private _searchHistoryService: SearchHistoryService
  ) {
    this._authService.getAuthStateObservable()
      .pipe(take(1))
      .subscribe((authState) => {
        this._userId = authState!.id;
      });
  }

  ngOnInit() {
    this._activatedRoute.paramMap.pipe(
      switchMap((params) => params.getAll('term'))
    ).pipe(take(1))
      .subscribe((data) => {
        this._query = {
          ...this._query,
          searchTerm: data
        };

        this.searchTerm = data;
      });

    this.getAlbumsByName(true, this._query);
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

    this.getAlbumsByName(true, this._query);
  }

  getAlbumsByName(onlyPublished: boolean, query: SearchParam) {
    this._searchService.getAlbumsByName(onlyPublished, query)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (result) => {
          this.albums = [...this.albums, ...result];
        }
      });
  }

  saveToSearchHistory = (album: AlbumForReadDTO) => {
    const history = {
      userId: this._userId,
      albumId: album.id
    } as WriteSearchHistory;

    this._searchHistoryService.addSearchHistory(history)
      .pipe(take(1)).subscribe();
  };
}

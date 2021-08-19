import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';
import { SearchParam } from 'src/app/models/search/search-param';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-all-playlists',
  templateUrl: './all-playlists.component.html',
  styleUrls: ['./all-playlists.component.sass']
})
export class AllPlaylistsComponent implements OnInit, OnDestroy {
  playlists: Array<PlaylistView> = new Array<PlaylistView>();
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

    this.getPlaylistsByName(this._query);
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

    this.getPlaylistsByName(this._query);
  }

  getPlaylistsByName(query: SearchParam) {
    this._searchService.getPlaylistsByName(query)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (result) => {
          this.playlists = [...this.playlists, ...result];
        }
      });
  }
}

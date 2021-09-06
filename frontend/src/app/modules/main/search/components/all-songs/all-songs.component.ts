import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SearchParam } from 'src/app/models/search/search-param';
import { Song } from 'src/app/models/song/song';
import { SongSortType } from 'src/app/models/song/song-sort-type';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.sass']
})
export class AllSongsComponent implements OnInit, OnDestroy {
  songs: Array<Song> = Array<Song>();
  searchTerm: string = '';

  private _unsubscribe$ = new Subject<void>();

  // for Infinity Scrolling
  public throttle: number = 300;
  public distance: number = 3;
  private _page: number = 0;
  private _itemsOnPage: number = 20;
  sortType: SongSortType | null = null;

  setSortType(sortType: SongSortType | null) {
    this.sortType = sortType;
  }

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

    this.getSongsByName(this._query);
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

    this.getSongsByName(this._query);
  }

  getSongsByName(query: SearchParam) {
    this._searchService.getSongsByName(query)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (result) => {
          this.songs = [...this.songs, ...result];
        }
      });
  }
}

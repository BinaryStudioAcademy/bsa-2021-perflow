import {
  Component, EventEmitter, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { of, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, take, takeUntil
} from 'rxjs/operators';
import { FoundData } from 'src/app/models/search/found-data';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SearchService } from 'src/app/services/search.service';
import { PageSectionFull } from 'src/app/models/constructor/page-section-full';
import { EntityType } from 'src/app/models/enums/entity-type';
import { PageSectionEntityFull } from 'src/app/models/constructor/page-section-entity-full';

@Component({
  selector: 'app-container-search',
  templateUrl: './container-search.component.html',
  styleUrls: ['./container-search.component.sass']
})
export class ContainerSearchComponent implements OnInit, OnDestroy {
  readonly amountOfFoundItems: number = 8;
  readonly debounceTime: number = 750;

  foundData = {} as FoundData;
  searchValue: string;
  currentAlbums: PageSectionEntityFull[];
  currentArtists: PageSectionEntityFull[];
  currentPlaylists: PageSectionEntityFull[];

  @Input()
  editedSection: PageSectionFull = {} as PageSectionFull;
  @Input()
  isAccordion: boolean;

  @Output()
  addDeleteFromSection = new EventEmitter<any>();

  private readonly _regex = new RegExp('search.*');
  private _searchTerms$ = new Subject<string>();
  private _unsubscribe$ = new Subject<void>();
  private _userId: number;

  constructor(
    private _searchService: SearchService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
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
    this.currentAlbums = this.editedSection.pageSectionEntities
      ?.filter((ps) => ps.entityType === EntityType.album);
    this.currentArtists = this.editedSection.pageSectionEntities
      ?.filter((ps) => ps.entityType === EntityType.artist);
    this.currentPlaylists = this.editedSection.pageSectionEntities
      ?.filter((ps) => ps.entityType === EntityType.playlist);
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  findSongsByName() {
    this._location.replaceState(this._router.url.replace(this._regex, `search/${this.searchValue}`));

    if (this.searchValue.trim()) {
      this._searchTerms$.next(this.searchValue);
      return;
    }
    this._searchTerms$.next();
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
        }
        else {
          this.foundData = {} as FoundData;
        }
      }
    });
  }

  clearSearch(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchValue = '';
      this.foundData = {} as FoundData;
      this._location.replaceState(this._router.url.replace(this._regex, 'search'));
    }
  }

  addDeleteFromSectionEvent(entity: any) {
    this.addDeleteFromSection.emit(entity);
  }
}

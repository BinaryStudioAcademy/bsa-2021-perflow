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
import { AlbumForReadDTO } from 'src/app/models/album/albumForReadDTO';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';

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
  currentGroups: PageSectionEntityFull[];
  placeholder: string;

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
    this.placeholder = !this.isAccordion
      ? 'Search for artists, groups, albums or playlists...'
      : 'Search for albums...';
    this.currentAlbums = this.editedSection.pageSectionEntities
      ?.filter((ps) => ps.entityType === EntityType.album);
    this.currentArtists = this.editedSection.pageSectionEntities
      ?.filter((ps) => ps.entityType === EntityType.artist);
    this.currentPlaylists = this.editedSection.pageSectionEntities
      ?.filter((ps) => ps.entityType === EntityType.playlist);
    this.currentGroups = this.editedSection.pageSectionEntities
      ?.filter((ps) => ps.entityType === EntityType.group);
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
        if (data.albums?.length
            || data.artists?.length
            || data.playlists?.length
            || data.songs?.length
            || data.groups?.length) {
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

  instanceOfAlbum = (data: any): data is AlbumForReadDTO => 'releaseYear' in data;

  instanceOfArtist = (data: any): data is ArtistReadDTO => 'isArtist' in data && data.isArtist;

  instanceOfGroup = (data: any): data is ArtistReadDTO => 'isArtist' in data && !data.isArtist;

  instanceOfPlaylist = (data: any): data is PlaylistView => !('releaseYear' in data) && !('userName' in data);

  addDeleteFromSectionEvent(entity: any) {
    this.addDeleteFromSection.emit(entity);
    if (this.instanceOfAlbum(entity)) {
      const albumsIndex = this.currentAlbums
        .findIndex((a) => a.referenceId === entity.id);
      if (albumsIndex === -1) {
        this.currentAlbums.push(this.convertToSectionEntity(entity, EntityType.album));
      }
      else {
        this.currentAlbums.splice(albumsIndex, 1);
      }
    }
    else if (this.instanceOfArtist(entity)) {
      const artistIndex = this.currentArtists
        .findIndex((a) => a.referenceId === entity.id);
      if (artistIndex === -1) {
        this.currentArtists.push(this.convertToSectionEntity(entity, EntityType.artist));
      }
      else {
        this.currentArtists.splice(artistIndex, 1);
      }
    }
    else if (this.instanceOfGroup(entity)) {
      const groupIndex = this.currentGroups
        .findIndex((a) => a.referenceId === entity.id);
      if (groupIndex === -1) {
        this.currentGroups.push(this.convertToSectionEntity(entity, EntityType.group));
      }
      else {
        this.currentGroups.splice(groupIndex, 1);
      }
    }
    else if (this.instanceOfPlaylist(entity)) {
      const playlistIndex = this.currentPlaylists
        .findIndex((a) => a.referenceId === entity.id);
      if (playlistIndex === -1) {
        this.currentPlaylists.push(this.convertToSectionEntity(entity, EntityType.playlist));
      }
      else {
        this.currentPlaylists.splice(playlistIndex, 1);
      }
    }
  }

  convertToSectionEntity(entity: any, entityType: EntityType) {
    const newEntityPageSection = this.editedSection;
    const newEntityPosition = newEntityPageSection.pageSectionEntities.length !== 0
      ? Math.max(...newEntityPageSection.pageSectionEntities
        .map((o: PageSectionEntityFull) => o.position)) + 1
      : 1;
    const newPageSectionEntity = {
      entityType,
      entity,
      referenceId: entity.id,
      pageSection: newEntityPageSection,
      position: newEntityPosition
    };
    return newPageSectionEntity;
  }
}

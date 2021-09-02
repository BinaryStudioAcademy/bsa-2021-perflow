import {
  Component, EventEmitter, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, takeUntil
} from 'rxjs/operators';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-colaborative-modal',
  templateUrl: './colaborative-modal.component.html',
  styleUrls: ['./colaborative-modal.component.sass']
})
export class ColaborativeModalComponent implements OnInit, OnDestroy {
  readonly debounceTime: number = 750;

  searchValue: string;
  foundUsers: Array<ArtistReadDTO> = new Array<ArtistReadDTO>();

  @Output()
  isClosed = new EventEmitter<void>();

  @Input()
  collaborators: Array<ArtistReadDTO> = [];
  @Output()
  collaboratorsChange = new EventEmitter<Array<ArtistReadDTO>>();

  private _searchTerms$ = new Subject<string>();
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.setSearch();
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  setSearch() {
    this._searchTerms$.pipe(
      takeUntil(this._unsubscribe$),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => this._searchService.getArtistByName({
        searchTerm: term, page: 1, itemsOnPage: 30
      }))
    ).subscribe({
      next: (data) => {
        this.foundUsers = data;
      }
    });
  }

  cancelModal() {
    this.isClosed.emit();
  }

  clickOnModal = (event: Event) => {
    event.stopPropagation();
  };

  clearSearch(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchValue = '';
      this.foundUsers = new Array<ArtistReadDTO>();
    }
  }

  isUserCollaborative(user: ArtistReadDTO) {
    return this.collaborators.find((u) => u.id === user.id) !== undefined;
  }

  addToCollaborative(user: ArtistReadDTO) {
    this.collaborators.push(user);
  }

  removeFromCollaborative(user: ArtistReadDTO) {
    this.collaborators = this.collaborators.filter((u) => u.id !== user.id);
  }

  findUsersByName() {
    if (this.searchValue.trim() !== '') {
      this._searchTerms$.next(this.searchValue);
    }
    else {
      this.foundUsers = [];
    }
  }
}

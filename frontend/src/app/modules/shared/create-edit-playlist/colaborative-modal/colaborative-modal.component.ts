import {
  Component, EventEmitter, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, filter, switchMap, takeUntil
} from 'rxjs/operators';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-colaborative-modal',
  templateUrl: './colaborative-modal.component.html',
  styleUrls: ['./colaborative-modal.component.sass']
})
export class ColaborativeModalComponent implements OnInit, OnDestroy {
  readonly debounceTime: number = 750;

  userId: number;
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
    private _searchService: SearchService,
    private _authService: AuthService
  ) {
    this._authService.getAuthStateObservableFirst()
      .pipe(filter((state) => !!state))
      .subscribe((authState) => {
        this.userId = authState!.id;
      });
  }

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
      switchMap((term: string) => this._searchService.getUsersByName({
        searchTerm: term, page: 1, itemsOnPage: 30
      }))
    ).subscribe({
      next: (data) => {
        this.foundUsers = data.filter((u) => u.id !== this.userId);
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
    const index = this.collaborators.indexOf(user);
    this.collaborators.splice(index, 1);
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

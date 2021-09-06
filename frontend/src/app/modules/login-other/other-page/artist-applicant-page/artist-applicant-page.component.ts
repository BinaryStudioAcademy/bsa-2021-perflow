import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, takeUntil
} from 'rxjs/operators';
import { UserRoles } from 'src/app/models/enums/user-roles.enum';
import { CreatedGroup } from 'src/app/models/group/createdGroup';
import { SearchParam } from 'src/app/models/search/search-param';
import { ArtistApplicant } from 'src/app/models/user/artist-applicant';
import { ArtistReadDTO } from 'src/app/models/user/ArtistReadDTO';
import { GroupService } from 'src/app/services/group.service';
import { SearchService } from 'src/app/services/search.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-artist-applicant-page',
  templateUrl: './artist-applicant-page.component.html',
  styleUrls: ['./artist-applicant-page.component.sass']
})
export class ArtistApplicantPageComponent implements OnInit, OnDestroy {
  public throttle: number = 300;
  public distance: number = 3;
  private _page: number = 1;
  private _itemsOnPage: number = 15;
  readonly debounceTime: number = 500;

  searchValue: string = '';
  isArtist: boolean = true;
  isModalShown = false;
  previousGroupData: CreatedGroup = { name: '', description: '' };
  createdGroup: ArtistReadDTO;
  groups: ArtistReadDTO[] = [];
  isJoinToGroupRoute: boolean = false;

  private _searchTerms$ = new Subject<string>();
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _searchService: SearchService,
    private _groupService: GroupService,
    private _userService: UserService,
    private _snackbarService: SnackbarService,
    private _spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.setSearch();

    if (this._router.url === '/perflowstudio/jointogroup') {
      this.isJoinToGroupRoute = true;
    }
  }

  createArtistApplicant(group?: ArtistReadDTO) {
    const applicant: ArtistApplicant = { userRole: UserRoles.artist, groupId: group?.id };

    this._userService.createArtistApplicant(applicant)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        () => {
          this._snackbarService.show({ message: 'Our moderators will review it soon.', header: 'Applicant sended!' });

          this._router.navigate(['/']);
        },
        (e: Error) => {
          this._snackbarService.show({ message: e.message, header: 'Error occured!' });
        }
      );
  }

  showModal() {
    this.isModalShown = !this.isModalShown;
  }

  closeModal() {
    this.isModalShown = !this.isModalShown;

    this.previousGroupData = { name: '', description: '' };
  }

  onSubmitModal(group: CreatedGroup) {
    this.isModalShown = !this.isModalShown;

    this.createGroup(group);
  }

  createGroup(group: CreatedGroup) {
    this._spinner.show();

    this._groupService.createGroup(group)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this._spinner.hide();
          this.createdGroup = data;
        }
      });
  }

  setSearch() {
    this._searchTerms$
      .pipe(
        takeUntil(this._unsubscribe$),
        debounceTime(this.debounceTime),
        distinctUntilChanged(),
        switchMap((term: string) => {
          if (term) {
            this._page = 1;
            return this._searchService.getGroupsByName({
              page: this._page,
              itemsOnPage: this._itemsOnPage,
              searchTerm: term
            });
          }
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          this.groups = data;
        }
      });
  }

  findGroup() {
    if (this.searchValue.trim()) {
      this._searchTerms$.next(this.searchValue);
      return;
    }
    this._searchTerms$.next();
  }

  getGroupsByName(query: SearchParam) {
    this._searchService.getGroupsByName(query)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (result) => {
          this.groups = [...this.groups, ...result];
        }
      });
  }

  clearSearch(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchValue = '';
    }
  }

  onScroll() {
    this._page += 1;

    this.getGroupsByName({ page: this._page, itemsOnPage: this._itemsOnPage, searchTerm: this.searchValue });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}

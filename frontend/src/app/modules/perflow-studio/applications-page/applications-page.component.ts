import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap, take, takeUntil
} from 'rxjs/operators';
import { EditUserRole } from 'src/app/models/applicants/edit-user-role';
import { EditUserApplicationStatus } from 'src/app/models/applicants/user-status-response';
import { UserWithStatus } from 'src/app/models/applicants/user-with-status';
import { ApplicantsService } from 'src/app/services/applicants.service';

@Component({
  selector: 'app-applications-page',
  templateUrl: './applications-page.component.html',
  styleUrls: ['./applications-page.component.sass']
})
export class ApplicationsPageComponent implements OnInit, OnDestroy {
  readonly debounceTime: number = 750;

  applicants = [] as UserWithStatus[];
  users = [] as UserWithStatus[];
  searchValue: string;

  private _unsubscribe$ = new Subject<void>();
  private _searchTerms$ = new Subject<string>();

  constructor(
    private _applicantsService: ApplicantsService
  ) { }

  ngOnInit() {
    this._applicantsService.getApplicants()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this.applicants = data;
        }
      });

    this.setSearch();
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
      switchMap((term: string) => this._applicantsService.getArtistByName(term))
    ).subscribe({
      next: (data) => {
        this.users = data;
      }
    });
  }

  findArtistByName() {
    if (this.searchValue.trim()) {
      this._searchTerms$.next(this.searchValue);
      return;
    }

    this._searchTerms$.next();
  }

  clearSearch(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.searchValue = '';
      this.users = [] as UserWithStatus[];
    }
  }

  setApplicationStatus(status: EditUserApplicationStatus) {
    this._applicantsService.setUserApplicationStatus(status)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.applicants = this.applicants.filter((a) => a.id !== status.id);
        }
      });
  }

  editRole(userRole: EditUserRole) {
    this._applicantsService.editUserRole(userRole)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          const index = this.users.findIndex((a) => a.id === userRole.id);
          this.users[index].role = userRole.role;
        }
      });
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { EditUserApplicationStatus } from 'src/app/models/applicants/user-status-response';
import { UserWithStatus } from 'src/app/models/applicants/user-with-status';
import { ApplicantsService } from 'src/app/services/applicants.service';

@Component({
  selector: 'app-applications-page',
  templateUrl: './applications-page.component.html',
  styleUrls: ['./applications-page.component.sass']
})
export class ApplicationsPageComponent implements OnInit, OnDestroy {
  applicants = [] as UserWithStatus[];

  private _unsubscribe$ = new Subject<void>();

  constructor(private _applicantsService: ApplicantsService) { }

  ngOnInit() {
    this._applicantsService.getApplicants()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe({
        next: (data) => {
          this.applicants = data;
        }
      });
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
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
}

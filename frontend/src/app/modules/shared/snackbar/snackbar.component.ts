import {
  trigger, transition, animate, style
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnackbarInfo } from 'src/app/models/common/snackbar-info';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.sass'],
  animations: [
    trigger('state', [
      transition(':enter', [
        style({ bottom: '-100px', transform: 'translate(-50%, 0%) scale(0.3)' }),
        animate('150ms cubic-bezier(0, 0, 0.2, 1)', style({
          transform: 'translate(-50%, 0%) scale(1)',
          opacity: 1,
          bottom: '20px'
        }))
      ]),
      transition(':leave', [
        animate('150ms cubic-bezier(0.4, 0.0, 1, 1)', style({
          transform: 'translate(-50%, 0%) scale(0.3)',
          opacity: 0,
          bottom: '-100px'
        }))
      ])
    ])
  ]
})

export class SnackbarComponent implements OnInit, OnDestroy {
  info: SnackbarInfo = { message: '' };
  show: boolean = false;
  defaultDuration: number = 3000;

  private _unsubscribe$ = new Subject<void>();

  constructor(private _snackbarService: SnackbarService) { }

  ngOnInit() {
    this._snackbarService.snackbarState$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (info) => {
          this.info = info;
          this._showSnackbar();
        }
      );
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
  }

  private _showSnackbar() {
    this.show = true;

    setTimeout(() => {
      this.show = false;
    }, this.info.duration ?? this.defaultDuration);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SnackbarInfo } from '../models/common/snackbar-info';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private _snackbarSubject = new Subject<SnackbarInfo>();

  snackbarState$ = this._snackbarSubject.asObservable();

  show(info: SnackbarInfo) {
    this._snackbarSubject.next(info);
  }
}

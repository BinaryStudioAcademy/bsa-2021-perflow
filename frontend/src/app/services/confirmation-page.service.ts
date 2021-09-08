import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationPageService implements OnDestroy {
  private _messageSubject$ = new Subject<string>();
  messageObservable$ = this._messageSubject$.asObservable();

  private _confirmSubject$ = new Subject();
  confirmObservable$ = this._confirmSubject$.asObservable();

  private _discardSubject$ = new Subject();
  discardObservable$ = this._discardSubject$.asObservable();

  private _unsubscribe$: Subject<void>;

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  getModalObesrvable() {
    return this.messageObservable$;
  }

  initConfirmation(
    message: string,
    confirmCallback: () => void,
    discardCallback: () => void
  ) {
    this._unsubscribe$ = new Subject<void>();
    this._messageSubject$.next(message);

    this.subscribeToConfirm(confirmCallback);
    this.subscribeToDiscard(discardCallback);
  }

  subscribeToConfirm(confirmCallback: () => void) {
    this.confirmObservable$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        confirmCallback();
        this.unsubscribe();
      });
  }

  subscribeToDiscard(discardCallback: () => void) {
    this.discardObservable$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        discardCallback();
        this.unsubscribe();
      });
  }

  unsubscribe() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  confirm() {
    this._confirmSubject$.next();
  }

  discard() {
    this._discardSubject$.next();
  }
}

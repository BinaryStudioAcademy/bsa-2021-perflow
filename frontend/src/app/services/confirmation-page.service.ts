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

  private _isModalShownSubject$ = new Subject<boolean>();
  isModalShownObservable$ = this._isModalShownSubject$.asObservable();

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
    this.setModalMessage(message);
    this.showModal();

    this.subscribeToConfirm(confirmCallback);
    this.subscribeToDiscard(discardCallback);
  }

  subscribeToConfirm(confirmCallback: () => void) {
    this.confirmObservable$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        confirmCallback();
        this.hideModal();
        this.unsubscribe();
      });
  }

  subscribeToDiscard(discardCallback: () => void) {
    this.discardObservable$
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(() => {
        discardCallback();
        this.hideModal();
        this.unsubscribe();
      });
  }

  unsubscribe() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  setModalMessage(message: string) {
    this._messageSubject$.next(message);
  }

  confirm() {
    this._confirmSubject$.next();
  }

  discard() {
    this._discardSubject$.next();
  }

  showModal() {
    this._isModalShownSubject$.next(true);
  }

  hideModal() {
    this._isModalShownSubject$.next(false);
  }
}

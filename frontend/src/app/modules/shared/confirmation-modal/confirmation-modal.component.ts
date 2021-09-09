import {
  Component, EventEmitter, OnDestroy, Output
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmationPageService } from 'src/app/services/confirmation-page.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.sass']
})
export class ConfirmationModalComponent implements OnDestroy {
  message: string = '';
  @Output() isClosed = new EventEmitter<void>();

  private _unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private _confirmationService: ConfirmationPageService
  ) {
    this._confirmationService.getModalObesrvable()
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((message) => {
        this.message = message;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  onConfirm() {
    this._confirmationService.confirm();
  }

  onDiscard() {
    this._confirmationService.discard();
  }

  cancelModal() {
    this.isClosed.emit();
  }

  clickOnModal = (event: Event) => {
    event.stopPropagation();
  };
}

import {
  Component, EventEmitter, OnInit, Output
} from '@angular/core';
import { ConfirmationPageService } from 'src/app/services/confirmation-page.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.sass']
})
export class ConfirmationModalComponent implements OnInit {
  message: string = 'Are you sure?';
  isModalShown: boolean = false;
  @Output() isClosed = new EventEmitter<void>();

  constructor(
    private _confirmationService: ConfirmationPageService
  ) {}

  ngOnInit(): void {
    this._confirmationService.getModalObesrvable()
      .subscribe((message) => {
        this.message = message;
        this.showModal();
      });
  }

  onConfirm() {
    this.hideModal();
    this._confirmationService.confirm();
  }

  onDiscard() {
    this.hideModal();
    this._confirmationService.discard();
  }

  cancelModal() {
    this.isClosed.emit();
  }

  clickOnModal = (event: Event) => {
    event.stopPropagation();
  };

  showModal() {
    this.isModalShown = true;
  }

  hideModal() {
    this.isModalShown = false;
  }
}

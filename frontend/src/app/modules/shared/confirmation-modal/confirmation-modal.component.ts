import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.sass']
})
export class ConfirmationModalComponent implements OnInit {
  @Input() message: string = '';

  @Output() confirm = new EventEmitter();
  @Output() discard = new EventEmitter();
  @Output() isClosed = new EventEmitter<void>();

  ngOnInit(): void {
    console.log(this.message);
  }

  onConfirm() {
    this.confirm.emit();
  }

  onDiscard() {
    this.discard.emit();
  }

  cancelModal() {
    this.isClosed.emit();
  }

  clickOnModal = (event: Event) => {
    event.stopPropagation();
    console.log(this.message);
  };
}

import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-square-info-card',
  templateUrl: './square-info-card.component.html',
  styleUrls: ['./square-info-card.component.sass']
})
export class SquareInfoCardComponent {
  @Input() id: number;
  @Input() name: string;
  @Input() description: string;
  @Input() iconUrl: string;

  @Input()
  isLiked = false;

  @Input() isForEdit = false;
  @Input() editRouterLink: string | undefined = undefined;

  @Output()
  clickDislike = new EventEmitter<number>();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  dislike(id: number) {
    this.clickDislike.emit(id);
  }

  edit() {
    if (this.editRouterLink) {
      this._router.navigate([`${this.editRouterLink}/${this.id}`], { relativeTo: this._activatedRoute });
    }
  }
}

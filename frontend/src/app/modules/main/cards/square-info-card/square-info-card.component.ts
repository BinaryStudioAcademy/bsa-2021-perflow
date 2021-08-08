import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square-info-card',
  templateUrl: './square-info-card.component.html',
  styleUrls: ['./square-info-card.component.sass']
})
export class SquareInfoCardComponent  {
  @Input() name: string;
  @Input() description: string;
  @Input() iconUrl: string;
}

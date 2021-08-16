import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circle-info-card',
  templateUrl: './circle-info-card.component.html',
  styleUrls: ['./circle-info-card.component.sass']
})
export class CircleInfoCardComponent {
  @Input() id: number;
  @Input() name: string;
  @Input() description: string;
  @Input() iconUrl: string;

  playAlbum = (id: number) => {
    
  };
}

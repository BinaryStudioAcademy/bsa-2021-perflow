import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mock-album-card',
  templateUrl: './mock-album-card.component.html',
  styleUrls: ['./mock-album-card.component.sass']
})
export class MOCKAlbumCardComponent {
  @Input() iconURL! : string;
  @Input() name! : string;
  @Input() description! : string;
}

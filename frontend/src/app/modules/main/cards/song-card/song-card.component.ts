import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.sass']
})
export class SongCardComponent {
  @Input() iconURL! : string;
  @Input() name! : string;
  @Input() artist! : string;
  @Input() podcast! : string;
}

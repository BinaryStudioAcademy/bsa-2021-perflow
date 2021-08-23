import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.sass']
})
export class PlayingComponent {
  @Input() isPaused = true;
}

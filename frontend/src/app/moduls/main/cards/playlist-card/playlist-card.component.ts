import { Component, Input } from '@angular/core';
import { Playlist } from '../../../../models/playlist';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.sass']
})
export class PlaylistCardComponent {
  @Input() playlist! : Playlist;
}

import { Component, Input } from '@angular/core';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.sass']
})
export class PlaylistCardComponent {
  @Input()
  playlist: PlaylistView = {} as PlaylistView;
}

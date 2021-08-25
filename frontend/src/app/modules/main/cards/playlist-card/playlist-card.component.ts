import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistView } from 'src/app/models/playlist/playlist-view';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.sass']
})
export class PlaylistCardComponent {
  @Input()
  playlist: PlaylistView = {} as PlaylistView;
  @Output()
  clickEmiter = new EventEmitter<void>();

  constructor(private _router: Router) {}

  redirectTo() {
    this.clickEmiter.emit();
    this._router.navigateByUrl(`/playlists/view-playlist/${this.playlist.id}`);
  }
}

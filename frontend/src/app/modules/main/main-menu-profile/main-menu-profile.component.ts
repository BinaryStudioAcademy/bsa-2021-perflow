import { Component, ViewChild } from '@angular/core';
import { SongInfo } from 'src/app/models/song/song-info';
import { SongToolbarComponent } from '../../shared/song-toolbar/song-toolbar.component';

@Component({
  selector: 'app-main-menu-profile',
  templateUrl: './main-menu-profile.component.html',
  styleUrls: ['./main-menu-profile.component.sass']
})
export class MainMenuProfileComponent {
  @ViewChild(SongToolbarComponent)
  private _songToolbar: SongToolbarComponent;

  playSong = (song: SongInfo) => {
    this._songToolbar.updateSong(song);
  };
}

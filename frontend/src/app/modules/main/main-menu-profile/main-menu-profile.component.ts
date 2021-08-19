import { Component, OnInit, ViewChild } from '@angular/core';
import { SongInfo } from 'src/app/models/song/song-info';
import { QueueComponent } from '../../shared/queue/queue/queue.component';
import { SongToolbarComponent } from '../../shared/song-toolbar/song-toolbar.component';

@Component({
  selector: 'app-main-menu-profile',
  templateUrl: './main-menu-profile.component.html',
  styleUrls: ['./main-menu-profile.component.sass']
})
export class MainMenuProfileComponent implements OnInit {
  @ViewChild(SongToolbarComponent)
  private _songToolbar: SongToolbarComponent;

  @ViewChild(QueueComponent)
  private _queue: QueueComponent;

  isContainerHidden: boolean;

  ngOnInit() {
    this.isContainerHidden = false;
  }

  playSong = (song: SongInfo) => {
    this._songToolbar.updateSong(song);
  };

  hideContainer = () => {
    this.isContainerHidden = true;
  };

  showContainer = () => {
    this.isContainerHidden = false;
  };

  toggleQueue = () => {
    if (!this._queue.isOpened) this._queue.openView();
    else this._queue.closeView();
  };
}

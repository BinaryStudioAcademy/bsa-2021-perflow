import {
  Component, OnInit, ViewChild
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SongInfo } from 'src/app/models/song/song-info';
import { QueueComponent } from '../music-components/queue/queue.component';
import { SongToolbarComponent } from '../music-components/song-toolbar/song-toolbar.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.sass']
})
export class MainContentComponent implements OnInit {
  @ViewChild(SongToolbarComponent)
  private _songToolbar: SongToolbarComponent;

  @ViewChild(QueueComponent)
  private _queue: QueueComponent;

  isContainerHidden: boolean;

  constructor(private _router: Router) {
    _router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this._queue.closeView();
      }
    });
  }

  ngOnInit() {
    this.isContainerHidden = false;
  }

  playSong = (song: SongInfo) => {
    this._songToolbar.updateSong(song);
  };

  togglePlay = () => {
    this._songToolbar.playPause();
  };

  hideContainer = () => {
    this.isContainerHidden = true;
  };

  showContainer = () => {
    this.isContainerHidden = false;
  };

  toggleQueue = () => {
    if (!this._queue.isOpened) {
      if (!this._queue.analyser) this._queue.analyser = this._songToolbar.getAnalyser();

      this._queue.openView();
    }
    else this._queue.closeView();
  };

  resetToolbar = () => {
    this._songToolbar.resetToolbar();
  };
}

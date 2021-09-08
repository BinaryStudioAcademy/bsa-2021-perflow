import {
  Component, OnDestroy, OnInit, ViewChild
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SongInfo } from 'src/app/models/song/song-info';
import { ConfirmationPageService } from 'src/app/services/confirmation-page.service';
import { QueueComponent } from '../music-components/queue/queue.component';
import { SongToolbarComponent } from '../music-components/song-toolbar/song-toolbar.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.sass']
})
export class MainContentComponent implements OnInit, OnDestroy {
  @ViewChild(SongToolbarComponent)
  private _songToolbar: SongToolbarComponent;

  @ViewChild(QueueComponent)
  private _queue: QueueComponent;

  isContainerHidden: boolean;
  isConfirmationModalShown: boolean = false;

  private _unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private _router: Router,
    private _confirmationService: ConfirmationPageService
    ) {
    _router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this._queue.closeView();
      }
    });

    this._confirmationService
    .isModalShownObservable$
    .pipe(takeUntil(this._unsubscribe$))
    .subscribe(
      isModalShown => {
        this.isConfirmationModalShown = isModalShown;
      }
    )
  }

  ngOnInit() {
    this.isContainerHidden = false;
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
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

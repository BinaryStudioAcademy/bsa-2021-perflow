import {
  Component, Input, Output, EventEmitter, OnInit
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { Song } from 'src/app/models/song/song';
import { AuthService } from 'src/app/services/auth/auth.service';
import { QueueService } from 'src/app/services/queue.service';
import { ReactionService } from 'src/app/services/reaction.service';

@Component({
  selector: 'app-song-row',
  templateUrl: './song-row.component.html',
  styleUrls: ['./song-row.component.sass']
})

export class SongRowComponent implements OnInit {
  private _userId: number;

  @Input() song: Song;
  @Input() number: number;
  @Input() highlightId: number;
  @Input() isInQueue = false;

  @Output() clickMenuItem = new EventEmitter<{ menuItem: string, song: Song }>();
  @Output() clickDislike = new EventEmitter<number>();

  constructor(
    private _reactionService: ReactionService,
    private _authService: AuthService,
    private _queueService: QueueService
  ) {
  }

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId() {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => !!state))
      .subscribe(
        (state) => {
          this._userId = state!.id;
        }
      );
  }

  clickItem(menu: string) {
    this.clickMenuItem.emit({ menuItem: menu, song: this.song });

    if (menu === 'Add to queue') this._queueService.addSongToQueue(this.song);
  }

  dislikeSong(songId: number) {
    this.clickDislike.emit(songId);

    this._reactionService.removeLike(songId, this._userId)
      .subscribe(
        () => {
          this.song.isLiked = false;
        }
      );
  }

  likeSong(songId: number) {
    this._reactionService.likeSong(songId, this._userId)
      .subscribe(
        () => {
          this.song.isLiked = true;
        }
      );
  }

  playSong = () => {
    if (!this.highlightId) {
      this._queueService.addSongToQueue(this.song);
    }

    this._queueService.initSong(this.song, true);
  };
}

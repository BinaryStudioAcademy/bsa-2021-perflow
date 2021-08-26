import { PlatformLocation } from '@angular/common';
import {
  Component, Input, Output, EventEmitter, OnInit
} from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { timer } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Song } from 'src/app/models/song/song';
import { AuthService } from 'src/app/services/auth/auth.service';
import { QueueService } from 'src/app/services/queue.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-song-row',
  templateUrl: './song-row.component.html',
  styleUrls: ['./song-row.component.sass']
})

export class SongRowComponent implements OnInit {
  private _userId: number;
  isEditing = false;
  isSuccess: boolean = false;

  @Input() song: Song;
  @Input() number: number;
  @Input() highlightId: number;
  @Input() isInQueue = false;
  @Input() isEditable = false;
  @Input() isPlaying = false;
  @Input() filterExplicit = false;

  @Output() clickMenuItem = new EventEmitter<{ menuItem: string, song: Song }>();
  @Output() clickDislike = new EventEmitter<number>();
  @Output() togglePlayEvent = new EventEmitter<void>();

  constructor(
    private _reactionService: ReactionService,
    private _authService: AuthService,
    private _queueService: QueueService,
    private _clipboardApi: ClipboardService,
    private _location: PlatformLocation,
    private _songService: SongsService
  ) { }

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

  copyLink() {
    this._clipboardApi.copyFromContent(
      `${this._location.hostname}:${this._location.port}/albums/${this.song.album.id}`
    );
    this.isSuccess = true;
    timer(3000).subscribe((val) => {
      this.isSuccess = Boolean(val);
    });
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

    if (this.highlightId !== this.song.id) {
      this._queueService.initSong(this.song, true);
    }
    else {
      this.togglePlayEvent.emit();
    }
  };

  pauseSong = () => {
    this.togglePlayEvent.emit();
  };

  editName = () => {
    this.isEditing = true;
  };

  saveName = () => {
    const subscription = this._songService.updateSongInfo(this.song).subscribe(() => {
      this.isEditing = false;
      subscription.unsubscribe();
    });
  };

  changeCensorship = () => {
    this.song.hasCensorship = !this.song.hasCensorship;
    const subscription = this._songService.updateSongInfo(this.song).subscribe(() => {
      subscription.unsubscribe();
    });
  };
}

import {
  Component, Input, Output, EventEmitter, OnInit
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { Song } from 'src/app/models/song/song';
import { SongInfo } from 'src/app/models/song/song-info';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpInternalService } from 'src/app/services/http-internal.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { SongToolbarService } from 'src/app/services/song-toolbar.service';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-song-row',
  templateUrl: './song-row.component.html',
  styleUrls: ['./song-row.component.sass']
})

export class SongRowComponent implements OnInit {
  private _userId: number;
  isEditing = false;

  @Input() song: Song;
  @Input() number: number;
  @Input() isEditable = false;

  @Output() clickMenuItem = new EventEmitter<{ menuItem: string, song: Song }>();
  @Output() clickDislike = new EventEmitter<number>();

  constructor(
    private _songService: SongsService,
    private _toolbarService: SongToolbarService,
    private _httpService: HttpInternalService,
    private _reactionService: ReactionService,
    private _authService: AuthService
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

  playSong = (id: number) => {
    // This code works, it is commented temporary

    this._songService.getSongById(id).subscribe((song) => {
      const testSong = new SongInfo(
        id,
        song.name,
        (song?.artist?.userName ?? song?.group?.name)!,
        this._httpService.buildUrl(`/api/Songs/file?blobId=${song.blobId}`),
        song.album.iconURL
      );
      this._toolbarService.updateSong(testSong);
    });
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
    const subscription = this._songService.updateSongInfo(this.song).subscribe(() => {
      this.song.hasCensorship = !this.song.hasCensorship;
      subscription.unsubscribe();
    });
  };
}

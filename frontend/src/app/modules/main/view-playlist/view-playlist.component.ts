import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Song } from 'src/app/models/song/song';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { SongsService } from 'src/app/services/songs/songs.service';

@Component({
  selector: 'app-view-playlist',
  templateUrl: './view-playlist.component.html',
  styleUrls: ['./view-playlist.component.sass']
})
export class ViewPlaylistComponent implements OnInit {
  songs: Song[] = [];
  private _userId: number;

  constructor(
    private _songService: SongsService,
    private _authService: AuthService,
    private _reactionService: ReactionService
  ) {}

  ngOnInit(): void {
    this.getUserId();
  }

  nextSlide = () => {};

  previousSlide = () => {};

  getUserId() {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => state !== null))
      .subscribe((authState) => {
        this._userId = authState!.id;
      });
  }

  dislikeSong(songId: number) {
    this._reactionService.removeLike(songId, this._userId)
      .subscribe({
        next: () => {
          this.songs = this.songs.filter((s) => s.id !== songId);
        }
      });
  }

  play = () => {};
}

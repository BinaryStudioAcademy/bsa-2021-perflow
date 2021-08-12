import {
  Component, OnInit
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReactionService } from 'src/app/services/reaction.service';
import { Song } from '../../../models/song/song';
import { SongsService } from '../../../services/songs/songs.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.sass']
})

export class SongsComponent implements OnInit {
  songs: Song[] = [];
  userName: string;

  private _userId: number;

  constructor(
    private _songService: SongsService,
    private _authService: AuthService,
    private _reactionService: ReactionService
  ) {}

  ngOnInit(): void {
    this.loadLikedSongs();

    this.getUserData();
  }

  loadLikedSongs() {
    this._songService.getLikedSongs().subscribe(
      (songs) => {
        this.songs = songs;
      }
    );
  }

  getUserData() {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => state !== null))
      .subscribe((authState) => {
        this._userId = authState!.id;
        this.userName = authState!.userName;
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
}

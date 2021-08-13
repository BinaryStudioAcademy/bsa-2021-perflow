import {
  Component, OnInit
} from '@angular/core';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Song } from '../../../models/song/song';
import { SongsService } from '../../../services/songs/songs.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.sass']
})

export class SongsComponent implements OnInit {
  songs: Song[] = [];
  private _userId: number;

  constructor(
    private _songService: SongsService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadLikedSongs();

    this.getUserId();
  }

  loadLikedSongs() {
    this._songService.getLikedSongs().subscribe(
      (songs) => {
        this.songs = songs;
      }
    );
  }

  getUserId() {
    this._authService.getAuthStateObservable()
      .pipe(filter((state) => state !== null))
      .subscribe((authState) => {
        this._userId = authState!.id;
      });
  }

  dislikeSong(songId: number) {
    this.songs = this.songs.filter((s) => s.id !== songId);
  }
}

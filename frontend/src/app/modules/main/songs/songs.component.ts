import {
  Component, OnInit, Output, EventEmitter
} from '@angular/core';
import { Song } from '../../../models/song/song';
import { SongsService } from '../../../services/songs/songs.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.sass']
})

export class SongsComponent implements OnInit {
  songs: Song[] = [];

  @Output()
  tt = new EventEmitter();

  constructor(
    private _songService: SongsService
  ) {}

  ngOnInit(): void {
    this.loadLikedSongs();
  }

  loadLikedSongs() {
    this._songService.getLikedSongs().subscribe(
      (songs) => {
        this.songs = songs;
      }
    );
  }
}

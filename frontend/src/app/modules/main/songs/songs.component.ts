import { Component, OnInit } from '@angular/core';
import { Song } from '../../../models/shared/song.model';
import { SongsService } from '../../../services/songs/songs.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.sass']
})

export class SongsComponent implements OnInit {
  songs: Song[] = [];

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

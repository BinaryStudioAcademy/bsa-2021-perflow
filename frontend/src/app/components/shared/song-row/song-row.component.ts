import { Component, OnInit, Input } from '@angular/core';
import { Song } from 'src/app/models/shared/song.model';

@Component({
  selector: 'app-song-row',
  templateUrl: './song-row.component.html',
  styleUrls: ['./song-row.component.sass']
})

export class SongRowComponent implements OnInit {
  @Input() song: Song;
  @Input() number: number;

  constructor() { }

  ngOnInit() {
  }

}

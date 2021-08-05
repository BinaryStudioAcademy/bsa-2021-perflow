import { Component, Input } from '@angular/core';
import { Song } from 'src/app/models/song/song';

@Component({
  selector: 'app-song-row',
  templateUrl: './song-row.component.html',
  styleUrls: ['./song-row.component.sass']
})

export class SongRowComponent {
  @Input() song: Song;
  @Input() number: number;
}

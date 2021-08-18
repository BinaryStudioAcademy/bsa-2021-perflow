import { Component, Input } from '@angular/core';
import { Song } from 'src/app/models/song/song';

@Component({
  selector: 'app-songs-result',
  templateUrl: './songs-result.component.html',
  styleUrls: ['./songs-result.component.sass']
})
export class SongsResultComponent {
  @Input() foundSongs: Array<Song> = new Array<Song>();
}

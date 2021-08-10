import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { Song } from 'src/app/models/song/song';

@Component({
  selector: 'app-search-song-row',
  templateUrl: './search-song-row.component.html',
  styleUrls: ['./search-song-row.component.sass']
})
export class SearchSongRowComponent {
  @Input() song: Song;

  @Output() clickButton = new EventEmitter<Song>();

  clickAddButon() {
    this.clickButton.emit(this.song);
  }
}

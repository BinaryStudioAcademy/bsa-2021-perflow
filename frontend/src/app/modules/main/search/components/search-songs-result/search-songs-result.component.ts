import { Component, Input } from '@angular/core';
import { Song } from 'src/app/models/song/song';
import { SongSortType } from 'src/app/models/song/song-sort-type';

@Component({
  selector: 'app-search-songs-result',
  templateUrl: './search-songs-result.component.html',
  styleUrls: ['./search-songs-result.component.sass']
})
export class SearchSongsResultComponent {
  @Input() songs: Array<Song> = new Array<Song>();
  @Input() term: string;

  sortType: SongSortType | null = null;

  setSortType(sortType: SongSortType | null) {
    this.sortType = sortType;
  }
}

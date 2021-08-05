import { Component, Input } from '@angular/core';
import { Song } from '../../../models/song/song';
import { SongSortType } from '../../../models/song/song-sort-type';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.sass']
})
export class SongsListComponent {
  @Input() songs: Song[];

  sortType: SongSortType | null = null;

  setSortType(sortType: SongSortType | null) {
    this.sortType = sortType;
  }
}

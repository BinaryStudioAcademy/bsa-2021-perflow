import { Component, Input } from '@angular/core';
import { Song } from '../../../models/shared/song.model';
import { SongSortType } from '../../../models/shared/song-sort-type.model';

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

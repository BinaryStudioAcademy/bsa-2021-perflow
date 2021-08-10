import {
  Component, Input, Output, EventEmitter
} from '@angular/core';
import { Song } from '../../../models/song/song';
import { SongSortType } from '../../../models/song/song-sort-type';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.sass']
})
export class SongsListComponent {
  @Input() songs: Song[];

  @Output() clickMenuItem = new EventEmitter<{ menuItem: string, song: Song }>();
  @Output() clickLike = new EventEmitter<number>();

  sortType: SongSortType | null = null;

  setSortType(sortType: SongSortType | null) {
    this.sortType = sortType;
  }

  rowMenuClick = (data: { menuItem: string, song: Song }) => {
    this.clickMenuItem.emit(data);
  };

  clickLikeIcon(songId: number) {
    this.clickLike.emit(songId);
  }
}

import {
  Component, Input, Output, EventEmitter
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Song } from '../../../models/song/song';
import { SongSortType } from '../../../models/song/song-sort-type';

@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.sass']
})
export class SongsListComponent {
  @Input() songs: Song[];
  @Input() isDraggable = false;
  @Input() isEditable = false;

  @Output() clickMenuItem = new EventEmitter<{ menuItem: string, song: Song }>();
  @Output() clickDislike = new EventEmitter<number>();

  sortType: SongSortType | null = null;

  drop(event: CdkDragDrop<Song[]>) {
    moveItemInArray(this.songs, event.previousIndex, event.currentIndex);
  }

  setSortType(sortType: SongSortType | null) {
    this.sortType = sortType;
  }

  rowMenuClick = (data: { menuItem: string, song: Song }) => {
    this.clickMenuItem.emit(data);
  };

  clickDislikeIcon(songId: number) {
    this.clickDislike.emit(songId);
  }
}

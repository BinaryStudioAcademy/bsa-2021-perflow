import {
  Component, EventEmitter, Input, Output
} from '@angular/core';
import { SongSortOrder, SongSortProperty, SongSortType } from '../../../models/song/song-sort-type';

@Component({
  selector: 'app-songs-list-header',
  templateUrl: './songs-list-header.component.html',
  styleUrls: ['./songs-list-header.component.sass']
})
export class SongsListHeaderComponent {
  @Input() isEditable = false;

  @Output() sortTypeChanged = new EventEmitter<SongSortType | null>();

  sortProperties = SongSortProperty;
  sortType: SongSortType | null = null;

  updateSortType(property: SongSortProperty) {
    if (this.sortType === null) {
      this.setSortType({
        property,
        order: SongSortOrder.descending
      });
      return;
    }

    if (this.sortType.property !== property) {
      this.setSortType({
        property,
        order: SongSortOrder.descending
      });
      return;
    }

    if (this.sortType.order === SongSortOrder.descending) {
      this.setSortType({
        property,
        order: SongSortOrder.ascending
      });
      return;
    }

    this.setSortType(null);
  }

  setSortType(sortType: SongSortType | null) {
    this.sortType = sortType;
    this.sortTypeChanged.emit(sortType);
  }

  showSortIcon(sortProperty: SongSortProperty) {
    return this.sortType && this.sortType.property === sortProperty;
  }
}

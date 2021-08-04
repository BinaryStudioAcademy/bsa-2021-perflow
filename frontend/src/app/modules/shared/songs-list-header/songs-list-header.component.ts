import {
  Component, EventEmitter, OnInit, Output
} from '@angular/core';
import { SongSortOrder, SongSortProperty, SongSortType } from '../../../models/shared/song-sort-type.model';

@Component({
  selector: 'app-songs-list-header',
  templateUrl: './songs-list-header.component.html',
  styleUrls: ['./songs-list-header.component.sass']
})
export class SongsListHeaderComponent implements OnInit {
  @Output() sortTypeChanged = new EventEmitter<SongSortType | null>();

  sortProperties = SongSortProperty;
  sortType: SongSortType | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  updateSortType(property: SongSortProperty) {
    if (this.sortType === null) {
      this.setSortType({
        property,
        order: SongSortOrder.Descending
      });
      return;
    }

    if (this.sortType.property !== property) {
      this.setSortType({
        property,
        order: SongSortOrder.Descending
      });
      return;
    }

    if (this.sortType.order === SongSortOrder.Descending) {
      this.setSortType({
        property,
        order: SongSortOrder.Ascending
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

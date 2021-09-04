import { Component, Input } from '@angular/core';
import { SongSortOrder } from 'src/app/models/song/song-sort-type';

@Component({
  selector: 'app-search-sort-order-icon',
  templateUrl: './search-sort-order-icon.component.html',
  styleUrls: ['./search-sort-order-icon.component.sass']
})
export class SearchSortOrderIconComponent {
  @Input() set order(value: SongSortOrder) {
    switch (value) {
      case SongSortOrder.ascending:
        this.iconClass = 'icon angle up';
        break;
      case SongSortOrder.descending:
        this.iconClass = 'icon angle down';
        break;
      default:
        this.iconClass = 'icon';
        break;
    }
  }

  iconClass = 'icon';
}

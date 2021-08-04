import { Component, Input } from '@angular/core';
import { SongSortOrder } from '../../../../models/shared/song-sort-type.model';

@Component({
  selector: 'app-sort-order-icon',
  templateUrl: './sort-order-icon.component.html',
  styleUrls: ['./sort-order-icon.component.sass']
})
export class SortOrderIconComponent {
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

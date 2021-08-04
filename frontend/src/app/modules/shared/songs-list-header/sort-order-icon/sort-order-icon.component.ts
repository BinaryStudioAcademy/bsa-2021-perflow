import { Component, Input, OnInit } from '@angular/core';
import { SongSortOrder } from '../../../../models/shared/song-sort-type.model';

@Component({
  selector: 'app-sort-order-icon',
  templateUrl: './sort-order-icon.component.html',
  styleUrls: ['./sort-order-icon.component.sass']
})
export class SortOrderIconComponent {
  @Input() set order(value: SongSortOrder) {
    switch (value) {
      case SongSortOrder.Ascending:
        this.iconClass = 'icon angle up';
        break;
      case SongSortOrder.Descending:
        this.iconClass = 'icon angle down';
        break;
    }
  }

  iconClass = 'icon';
}

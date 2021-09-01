import { Pipe, PipeTransform } from '@angular/core';
import { Song } from 'src/app/models/song/song';

@Pipe({
  name: 'filterExplicit'
})
export class FilterExplicitPipe implements PipeTransform {
  transform = (items: Song[], isFiltering: boolean): Song[] => {
    if (!isFiltering || !items) {
      return items;
    }
    return items.filter((s) => !s.hasCensorship);
  };
}

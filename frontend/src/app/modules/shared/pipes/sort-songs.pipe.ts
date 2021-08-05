import { Pipe, PipeTransform } from '@angular/core';
import { Song } from '../../../models/song/song';
import { getCompareFunctionFromSortType } from '../../../helpers/sort-compare-functions';
import { SongSortType } from '../../../models/song/song-sort-type';

@Pipe({
  name: 'sortSongs'
})
export class SortSongsPipe implements PipeTransform {
  transform = (songs: Song[], sortType: SongSortType | null): Song[] => {
    if (sortType === null) {
      return songs;
    }

    const compareFunction = getCompareFunctionFromSortType(sortType);
    return [...songs].sort(compareFunction);
  };
}

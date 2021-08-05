import { Song } from '../models/song/song';
import { SongSortOrder, SongSortProperty, SongSortType } from '../models/song/song-sort-type.model';

type SongsCompareFunction = (a: Song, b: Song) => number;

function getOrderNum(order: SongSortOrder) {
  return order === SongSortOrder.ascending ? -1 : 1;
}

function compare<T>(a: T, b: T, order: SongSortOrder) {
  const orderNum = getOrderNum(order);

  if (a < b) {
    return -orderNum;
  }

  if (a > b) {
    return orderNum;
  }

  return 0;
}

function compareStrings(a: string, b: string, order: SongSortOrder) {
  const orderNum = getOrderNum(order);
  return orderNum * a.localeCompare(b, undefined, { sensitivity: 'accent' });
}

export function getCompareFunctionFromSortType(sortType: SongSortType): SongsCompareFunction {
  switch (sortType.property) {
    case SongSortProperty.name:
      return (a, b) => compareStrings(a.name, b.name, sortType.order);
    case SongSortProperty.artist:
      return (a, b) => compareStrings(a.artist.name, b.artist.name, sortType.order);
    case SongSortProperty.album:
      return (a, b) => compareStrings(a.album.name, b.album.name, sortType.order);
    case SongSortProperty.time:
      return (a, b) => compare<number>(a.duration, b.duration, sortType.order);
    default:
      return (a, b) => compare<Date>(a.createdAt, b.createdAt, sortType.order);
  }
}

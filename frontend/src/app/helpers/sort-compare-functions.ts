import { Song } from '../models/shared/song.model';
import { SongSortOrder, SongSortProperty, SongSortType } from '../models/shared/song-sort-type.model';

type SongsCompareFunction = (a: Song, b: Song) => number;

export function getCompareFunctionFromSortType(sortType: SongSortType): SongsCompareFunction {
  switch (sortType.property) {
    case SongSortProperty.Name:
      return (a, b) => compareStrings(a.name, b.name, sortType.order);
    case SongSortProperty.Artist:
      return (a, b) => compareStrings(a.artist.userName, b.artist.userName, sortType.order);
    case SongSortProperty.Album:
      return (a, b) => compareStrings(a.album.name, b.album.name, sortType.order);
    case SongSortProperty.Added:
      return (a, b) => compare<Date>(a.createdAt, b.createdAt, sortType.order);
    case SongSortProperty.Time:
      return (a, b) => compare<number>(a.duration, b.duration, sortType.order);
  }
}

function getOrderNum(order: SongSortOrder) {
  return order === SongSortOrder.Ascending ? -1 : 1;
}

function compare<T>(a: T, b: T, order: SongSortOrder) {
  const orderNum = getOrderNum(order);

  if (a < b) return -orderNum;

  if (a > b) return orderNum;

  return 0;
}

function compareStrings(a: string, b: string, order: SongSortOrder) {
  const orderNum = getOrderNum(order);
  return orderNum * a.localeCompare(b, undefined, { sensitivity: 'accent' });
}

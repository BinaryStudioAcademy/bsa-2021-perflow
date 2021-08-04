export enum SongSortProperty {
  name,
  artist,
  album,
  added,
  time
}

export enum SongSortOrder {
  ascending,
  descending
}

export interface SongSortType {
  property: SongSortProperty;
  order: SongSortOrder;
}

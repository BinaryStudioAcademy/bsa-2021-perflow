export enum SongSortProperty {
  name,
  artist,
  album,
  frequency,
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

export enum SongSortProperty {
  Name,
  Artist,
  Album,
  Added,
  Time
}

export enum SongSortOrder {
  Ascending,
  Descending
}

export interface SongSortType {
  property: SongSortProperty;
  order: SongSortOrder;
}

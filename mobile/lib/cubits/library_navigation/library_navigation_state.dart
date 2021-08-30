part of 'library_navigation_cubit.dart';

@freezed
class LibraryNavigationState with _$LibraryNavigationState {
  factory LibraryNavigationState.all() = LibraryNavigationAll;
  factory LibraryNavigationState.artists() = LibraryNavigationArtists;
  factory LibraryNavigationState.albums() = LibraryNavigationAlbums;
  factory LibraryNavigationState.songs() = LibraryNavigationSongs;
}

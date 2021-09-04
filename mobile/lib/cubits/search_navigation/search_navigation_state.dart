part of 'search_navigation_cubit.dart';

@freezed
class SearchNavigationState with _$SearchNavigationState {
  factory SearchNavigationState.playlists() = SearchNavigationPlaylists;
  factory SearchNavigationState.artists() = SearchNavigationArtists;
  factory SearchNavigationState.albums() = SearchNavigationAlbums;
  factory SearchNavigationState.songs() = SearchNavigationSongs;
}

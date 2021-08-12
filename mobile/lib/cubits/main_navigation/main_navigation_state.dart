part of 'main_navigation_cubit.dart';

@freezed
class MainNavigationState with _$MainNavigationState {
  factory MainNavigationState.home() = MainNavigationHome;
  factory MainNavigationState.search() = MainNavigationSearch;
  factory MainNavigationState.playlists() = MainNavigationPlaylists;
}

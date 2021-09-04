import 'package:flutter/cupertino.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'search_navigation_state.dart';
part 'search_navigation_cubit.freezed.dart';

class SearchNavigationCubit extends Cubit<SearchNavigationState> {
  SearchNavigationCubit() : super(SearchNavigationState.songs());

  void setPlaylists() => emit(SearchNavigationState.playlists());

  void setArtists() => emit(SearchNavigationState.artists());

  void setAlbums() => emit(SearchNavigationState.albums());

  void setSongs() => emit(SearchNavigationState.songs());
}

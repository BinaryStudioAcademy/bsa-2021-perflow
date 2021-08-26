import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'library_navigation_state.dart';
part 'library_navigation_cubit.freezed.dart';

class LibraryNavigationCubit extends Cubit<LibraryNavigationState> {
  LibraryNavigationCubit() : super(LibraryNavigationState.all());

  void setAll() => emit(LibraryNavigationState.all());

  void setArtists() => emit(LibraryNavigationState.artists());

  void setAlbums() => emit(LibraryNavigationState.albums());
}

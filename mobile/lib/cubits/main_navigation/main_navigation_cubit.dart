import 'package:bloc/bloc.dart';
import 'package:flutter/cupertino.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:meta/meta.dart';
import 'package:perflow/routes.dart';
import 'package:vrouter/vrouter.dart';

part 'main_navigation_state.dart';
part 'main_navigation_cubit.freezed.dart';

class MainNavigationCubit extends Cubit<MainNavigationState> {
  final InitializedVRouterSailor _router;

  MainNavigationCubit(this._router) : super(MainNavigationState.home());

  void goToHome() {
    _router.to(Routes.home);
    emit(MainNavigationState.home());
  }

  void goToSearch() {
    _router.to(Routes.search);
    emit(MainNavigationState.search());
  }

  void goToPlaylists() {
    _router.to(Routes.playlists);
    emit(MainNavigationState.playlists());
  }
}

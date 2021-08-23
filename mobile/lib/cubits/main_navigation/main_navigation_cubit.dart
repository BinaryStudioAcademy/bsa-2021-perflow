import 'package:bloc/bloc.dart';
import 'package:flutter/cupertino.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:meta/meta.dart';

part 'main_navigation_state.dart';
part 'main_navigation_cubit.freezed.dart';

class MainNavigationCubit extends Cubit<MainNavigationState> {
  MainNavigationCubit() : super(MainNavigationState.home());

  void setHome() => emit(MainNavigationState.home());

  void setSearch() => emit(MainNavigationState.search());

  void setLibrary() => emit(MainNavigationState.library());

  void setPlayer() => emit(MainNavigationState.player());

  void setOther() => emit(MainNavigationState.other());
}

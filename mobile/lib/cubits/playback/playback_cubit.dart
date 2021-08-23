import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/playback/playback_data.dart';
import 'package:perflow/services/playback/playback_service.dart';

part 'playback_state.dart';
part 'playback_cubit.freezed.dart';

class PlaybackCubit extends Cubit<PlaybackState> {
  final _playbackService = getService<PlaybackService>();

  late final StreamSubscription<PlaybackData?> _playbackChangesSubscription;

  PlaybackCubit() : super(PlaybackState.none()) {
    _playbackChangesSubscription = _playbackService.playbackChanges.listen(_handlePlaybackChange);
  }

  void _handlePlaybackChange(PlaybackData? data) async {
    if(data == null) {
      emit(PlaybackState.none());
      return;
    }

    emit(PlaybackState.playing(data));
  }

  @override
  Future<void> close() async {
    await _playbackChangesSubscription.cancel();
    return super.close();
  }
}

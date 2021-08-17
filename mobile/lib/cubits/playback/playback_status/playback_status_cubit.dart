import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/services/playback/playback_service.dart';

part 'playback_status_state.dart';
part 'playback_status_cubit.freezed.dart';

class PlaybackStatusCubit extends Cubit<PlaybackStatusState> {
  late final StreamSubscription<bool> _playingSubscription;

  PlaybackStatusCubit() : super(PlaybackStatusState.none()) {
    _playingSubscription = getService<PlaybackService>().player.playingStream.listen(_handlePlayingChange);
  }

  void _handlePlayingChange(bool playing) {
    emit(playing ? PlaybackStatusState.playing() : PlaybackStatusState.paused());
  }

  @override
  Future<void> close() {
    _playingSubscription.cancel();
    return super.close();
  }
}

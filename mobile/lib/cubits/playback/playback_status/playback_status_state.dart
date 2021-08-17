part of 'playback_status_cubit.dart';

@freezed
class PlaybackStatusState with _$PlaybackStatusState {
  factory PlaybackStatusState.none() = PlaybackStatusStateNone;
  factory PlaybackStatusState.paused() = PlaybackStatusStatePaused;
  factory PlaybackStatusState.playing() = PlaybackStatusStatePlaying;
}

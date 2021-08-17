part of 'playback_cubit.dart';

@freezed
class PlaybackState with _$PlaybackState {
  factory PlaybackState.none() = PlaybackStateNone;
  factory PlaybackState.playing({
    required Song song,
    required Stream<PlaybackTime> playbackTimeChanges,
  }) = PlaybackStatePlaying;
}

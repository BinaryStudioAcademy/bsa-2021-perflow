part of 'playback_queue_cubit.dart';

@freezed
class PlaybackQueueState with _$PlaybackQueueState {
  factory PlaybackQueueState.empty() = PlaybackQueueEmpty;
  factory PlaybackQueueState.playing(QueueData data) = PlaybackQueuePlaying;
}

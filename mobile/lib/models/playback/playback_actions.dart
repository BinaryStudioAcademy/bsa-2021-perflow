import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:perflow/models/playback/playback_repeat_mode.dart';

part 'playback_actions.freezed.dart';

@freezed
class PlaybackActions with _$PlaybackActions {
  factory PlaybackActions({
    required bool playing,
    required bool shuffleEnabled,
    required RepeatMode repeatMode,
  }) = _PlaybackActions;
}

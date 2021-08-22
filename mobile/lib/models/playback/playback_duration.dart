import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:rxdart/rxdart.dart';

part 'playback_duration.freezed.dart';

@freezed
class PlaybackDuration with _$PlaybackDuration {
  factory PlaybackDuration({
    required Duration max,
    required BehaviorSubject<Duration> timeChanges,
  }) = _PlaybackDuration;
}

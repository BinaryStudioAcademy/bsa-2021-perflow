import 'package:flutter/foundation.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:perflow/models/playback/playback_actions.dart';
import 'package:perflow/models/playback/playback_duration.dart';
import 'package:perflow/models/songs/song.dart';

part 'playback_data.freezed.dart';

@freezed
class PlaybackData with _$PlaybackData {
  factory PlaybackData({
    required Song song,
    required PlaybackActions actions,
    PlaybackDuration? duration
  }) = _PlaybackState;
}

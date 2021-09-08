import 'package:flutter/foundation.dart';
import 'package:just_audio/just_audio.dart';
import 'package:perflow/models/playback/playback_actions.dart';
import 'package:perflow/models/playback/playback_duration.dart';
import 'package:perflow/models/songs/song.dart';

@immutable
class PlaybackEventData {
  final PlaybackEvent event;
  final Song? song;
  final PlaybackActions actions;
  final PlaybackDuration? duration;

  const PlaybackEventData({
    required this.event,
    required this.song,
    required this.actions,
    required this.duration
  });
}

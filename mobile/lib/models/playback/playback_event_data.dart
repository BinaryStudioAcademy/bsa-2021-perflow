import 'package:flutter/foundation.dart';
import 'package:just_audio/just_audio.dart';
import 'package:perflow/models/playback/playback_data.dart';

@immutable
class PlaybackEventData {
  final PlaybackEvent event;
  final PlaybackData? data;

  const PlaybackEventData({
    required this.event,
    required this.data,
  });
}

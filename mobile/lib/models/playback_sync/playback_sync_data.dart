import 'package:freezed_annotation/freezed_annotation.dart';

part 'playback_sync_data.freezed.dart';
part 'playback_sync_data.g.dart';

@freezed
class PlaybackSyncData with _$PlaybackSyncData {
  factory PlaybackSyncData(
    int songId,
    int time
  ) = _PlaybacSyncData;

  factory PlaybackSyncData.fromJson(Map<String, dynamic> json) => _$PlaybackSyncDataFromJson(json);
}

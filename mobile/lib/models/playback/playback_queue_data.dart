import 'package:fast_immutable_collections/fast_immutable_collections.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:perflow/models/songs/song.dart';

part 'playback_queue_data.freezed.dart';

@freezed
class QueueData with _$QueueData {
  QueueData._();

  factory QueueData({
    required IList<Song> songs,
    required int currentIndex
  }) = _QueueData;

  Song? get currentSong {
    if(currentIndex < 0 || currentIndex >= songs.length) {
      return null;
    }

    return songs[currentIndex];
  }
}

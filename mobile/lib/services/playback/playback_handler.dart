import 'package:audio_service/audio_service.dart';
import 'package:just_audio/just_audio.dart';
import 'package:perflow/models/playback/playback_event_data.dart';
import 'package:perflow/services/playback/playback_service.dart';
import 'package:rxdart/rxdart.dart';

class PlaybackHandler extends BaseAudioHandler with QueueHandler, SeekHandler {
  final AudioPlayer _player;
  final PlaybackService _playbackService;

  PlaybackHandler(
    this._player,
    this._playbackService
  ) {
    CombineLatestStream<dynamic, PlaybackEventData>(
      [
        _playbackService.playbackChanges,
        _player.playbackEventStream
      ],
      (values) => PlaybackEventData(
        data: values[0],
        event: values[1]
      ))
      .doOnData(prepareSong)
      .map(_transformPlaybackDataEvent)
      .pipe(playbackState);
  }

  void prepareSong(PlaybackEventData eventData) async {
    if (eventData.data == null) {
      return;
    }

    final song = eventData.data!.song;
    if(mediaItem.value?.id != song.id.toString()) {
      final item = MediaItem(
        id: song.id.toString(),
        title: song.name,
        artist: (song.artist == null ? song.group!.name : song.artist!.userName),
        album: song.album.name,
        artUri: song.album.iconURL != null ? Uri.parse(song.album.iconURL!) : null
      );

      mediaItem.add(item);
    }

    final duration = eventData.data!.duration?.max;
    if(mediaItem.value?.duration != duration) {
      mediaItem.add(mediaItem.value?.copyWith(duration: duration));
    }
  }

  @override
  Future<void> play() {
    return _player.play();
  }

  @override
  Future<void> pause() async {
    await _player.pause();
  }

  @override
  Future<void> seek(Duration position) async {
    await _player.seek(position);
  }

  @override
  Future<void> setSpeed(double speed) async {
    await _player.setSpeed(speed);
  }

  PlaybackState _transformPlaybackDataEvent(PlaybackEventData eventData) {
    return PlaybackState(
      controls: [
        const MediaControl(
          androidIcon: 'mipmap/ic_launcher',
          label: 'Like',
          action: MediaAction.setRating
        ),
        MediaControl.skipToPrevious,
        eventData.data?.actions.playing == true
          ? MediaControl.pause
          : MediaControl.play,
        MediaControl.skipToNext,
      ],
      systemActions: const {
        MediaAction.seek,
        MediaAction.seekForward,
        MediaAction.seekBackward,
      },
      androidCompactActionIndices: const [1, 2, 3],
      processingState: const {
        ProcessingState.idle: AudioProcessingState.idle,
        ProcessingState.loading: AudioProcessingState.loading,
        ProcessingState.buffering: AudioProcessingState.buffering,
        ProcessingState.ready: AudioProcessingState.ready,
        ProcessingState.completed: AudioProcessingState.completed,
      }[_player.processingState]!,
      playing: eventData.data?.actions.playing ?? false,
      updatePosition: eventData.data?.duration?.timeChanges.valueOrNull ?? Duration.zero,
      bufferedPosition: _player.bufferedPosition,
      speed: _player.speed,
      queueIndex: eventData.event.currentIndex,
      errorMessage: "Couldn't load music"
    );
  }
}

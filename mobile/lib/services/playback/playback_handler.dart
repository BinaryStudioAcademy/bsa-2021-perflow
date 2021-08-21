import 'package:audio_service/audio_service.dart';
import 'package:just_audio/just_audio.dart';
import 'package:perflow/api_urls.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:rxdart/rxdart.dart';

class PlaybackHandler extends BaseAudioHandler with QueueHandler, SeekHandler {
  final AudioPlayer _player;
  final AuthService _authService;

  PlaybackHandler(
    this._player,
    this._authService
  ) {
    _player.playbackEventStream
      .withLatestFrom(_authService.authStateChanges, (playbackEvent, authState) => playbackEvent)
      .map(_transformPlaybackEvent)
      .pipe(playbackState);
  }

  Future<void> prepareSong(Song song, [Map<String, dynamic>? extras]) {
    var uri = Uri.parse('${ApiUrls.base}/api/songs/file?blobId=${song.blobId}');

    return _prepareMediaItem(
      uri: uri,
      item: MediaItem(
        id: uri.toString(),
        title: song.name,
        album: song.album.name,
        artist: song.artist.userName,
        artUri: song.album.iconURL != null ? Uri.parse(song.album.iconURL!) : null
      ),
      extras: extras
    );
  }

  Future<void> playSong(Song song) async {
    await prepareSong(song);
    await _player.play();
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
  Future<void> stop() async {
    await _player.stop();
  }

  @override
  Future<void> seek(Duration position) async {
    await _player.seek(position);
  }

  @override
  Future<void> setSpeed(double speed) async {
    await _player.setSpeed(speed);
  }

  Future<void> _prepareMediaItem({
    required Uri uri,
    required MediaItem item,
    Map<String, dynamic>? extras
  }) async {
    if (_isPlaying(uri)) {
      return;
    }

    item = item.copyWith(extras: extras);

    mediaItem.add(item);

    final duration = await _player.setAudioSource(
      AudioSource.uri(uri),
      initialPosition: Duration.zero,
    );

    if (duration != null && duration != item.duration) {
      mediaItem.add(item.copyWith(duration: duration));
    }
  }

  bool _isPlaying(Uri uri) {
    if (mediaItem.valueOrNull?.id == null) {
      return false;
    }

    return mediaItem.valueOrNull?.id == uri.toString();
  }

  PlaybackState _transformPlaybackEvent(PlaybackEvent event) {
    return PlaybackState(
      controls: [
        const MediaControl(
          androidIcon: 'mipmap/ic_launcher',
          label: 'Like',
          action: MediaAction.setRating
        ),
        MediaControl.skipToPrevious,
        _player.playing
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
      playing: _authService.isAuthenticated,
      updatePosition: _player.position,
      bufferedPosition: _player.bufferedPosition,
      speed: _player.speed,
      queueIndex: event.currentIndex,
      errorMessage: "Couldn't load music"
    );
  }
}

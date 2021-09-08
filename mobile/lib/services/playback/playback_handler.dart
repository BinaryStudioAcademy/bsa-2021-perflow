import 'dart:io';
import 'package:audio_service/audio_service.dart';
import 'package:flutter/services.dart';
import 'package:just_audio/just_audio.dart';
import 'package:logger/logger.dart';
import 'package:perflow/api_urls.dart';
import 'package:perflow/helpers/math/clamp.dart';
import 'package:perflow/models/playback/playback_actions.dart';
import 'package:perflow/models/playback/playback_duration.dart';
import 'package:perflow/models/playback/playback_event_data.dart';
import 'package:perflow/models/playback/playback_repeat_mode.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:rxdart/rxdart.dart';

class PlaybackHandler extends BaseAudioHandler with QueueHandler, SeekHandler {
  final _logger = Logger();

  final _player = AudioPlayer();
  final AuthService _authService;

  final _songSubject = BehaviorSubject<Song?>.seeded(null);
  final _actionsSubject = BehaviorSubject<PlaybackActions>.seeded(_defaultActions);
  final _durationSubject = BehaviorSubject<PlaybackDuration?>.seeded(null);
  final _seekSubject = PublishSubject<Duration>();
  final _skipToNextSubject = PublishSubject<void>();
  final _skipToPreviousSubject = PublishSubject<void>();

  static final _defaultActions = PlaybackActions(
    playing: false,
    shuffleEnabled: false,
    repeatMode: RepeatMode.none
  );

  PlaybackHandler(
    this._authService
  ) {
    CombineLatestStream<dynamic, PlaybackEventData>(
      [
        _player.playbackEventStream.handleError(_handleError),
        _songSubject,
        _actionsSubject,
        _durationSubject,
      ],
      (values) => PlaybackEventData(
        event: values[0],
        song: values[1],
        actions: values[2],
        duration: values[3]
      ))
      .map(_transformPlaybackDataEvent)
      .pipe(playbackState);
  }

  Song? get currentSong => _songSubject.valueOrNull;
  Stream<Song?> get songChanges => _songSubject
    .distinct((dataA, dataB) => dataA == dataB);

  PlaybackActions get currentActions => _actionsSubject.value;
  Stream<PlaybackActions> get actionsChanges => _actionsSubject
    .distinct((dataA, dataB) => dataA == dataB);

  PlaybackDuration? get currentDuration => _durationSubject.valueOrNull;
  Stream<PlaybackDuration?> get durationChanges => _durationSubject
    .distinct((dataA, dataB) => dataA == dataB);

  Stream<Duration> get onSeek => _seekSubject;

  Stream<void> get onSkipToNext => _skipToNextSubject;
  Stream<void> get onSkipToPrevious => _skipToPreviousSubject;

  Future<void> setSong(Song song) async {
    _songSubject.add(song);

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

    final songDuration = await _safeSetSongById(song.id);

    if(songDuration != null) {
      if(mediaItem.value?.duration != songDuration) {
        mediaItem.add(mediaItem.value?.copyWith(duration: songDuration));
      }

      _durationSubject.add(
        PlaybackDuration(
          max: songDuration,
          timeChanges: BehaviorSubject<Duration>()..addStream(_player.positionStream)
        )
      );
    }
  }

  @override
  Future<void> stop() async {
    _songSubject.add(null);
    _durationSubject.add(null);
    _updateActions(false);
    await _player.stop();
  }

  @override
  Future<void> play() async {
    _updateActions(true);
    await _player.play();
  }

  @override
  Future<void> pause() async {
    _updateActions(false);
    await _player.pause();
  }

  Future<void> seekPercent(double percent) {
    percent = clamp(percent);
    return seek((currentDuration?.max ?? Duration.zero) * percent);
  }

  @override
  Future<void> seek(Duration position) async {
    _seekSubject.add(position);
    await _player.seek(position);
  }

  Future<void> seekWithoutSync(Duration position) async {
    await _player.seek(position);
  }

  @override
  Future<void> skipToNext() async {
    _skipToNextSubject.add(null);
  }

  @override
  Future<void> skipToPrevious() async {
    _skipToPreviousSubject.add(null);
  }

  @override
  Future<void> setSpeed(double speed) async {
    await _player.setSpeed(speed);
  }

  void setRepeat(RepeatMode repeatMode) {
    _actionsSubject.add(
      currentActions.copyWith(
        repeatMode: repeatMode
      )
    );
  }

  void setShuffle(bool shuffle) {
    _actionsSubject.add(
      currentActions.copyWith(
        shuffleEnabled: shuffle
      )
    );
  }

  void _updateActions(bool playing) {
    var currentActions = _actionsSubject.value;

    _actionsSubject.add(
      currentActions.copyWith(
        playing: playing
      )
    );
  }

  Future<Duration?> _safeSetSongById(int songId) async {
    final token = await _authService.getToken();

    final headers = token != null ? {
      HttpHeaders.authorizationHeader: 'Bearer ' + token
    } : null;

    try {
      return await _player.setUrl(
        '${ApiUrls.base}/api/songs/$songId/file',
        headers: headers,
      );
    }
    on PlayerInterruptedException {
      _logger.i('Player loading interrupted');
    }
    catch (e) {
      _logger.e(e);
    }
  }

  void _handleError(dynamic error) {
    if(error is PlatformException && error.code == 'abort') {
      return;
    }

    _logger.e('Playback error:\n${error.toString()}');
  }

  PlaybackState _transformPlaybackDataEvent(PlaybackEventData eventData) {
    final processingState = const {
      ProcessingState.idle: AudioProcessingState.idle,
      ProcessingState.loading: AudioProcessingState.loading,
      ProcessingState.buffering: AudioProcessingState.buffering,
      ProcessingState.ready: AudioProcessingState.ready,
      ProcessingState.completed: AudioProcessingState.completed,
    }[_player.processingState]!;

    return PlaybackState(
      controls: [
        MediaControl.skipToPrevious,
        eventData.actions.playing == true
          ? MediaControl.pause
          : MediaControl.play,
        MediaControl.skipToNext,
        MediaControl.stop
      ],
      systemActions: const {
        MediaAction.seek,
        MediaAction.seekForward,
        MediaAction.seekBackward
      },
      androidCompactActionIndices: const [0, 1, 2],
      processingState: processingState,
      playing: eventData.actions.playing,
      updatePosition: eventData.duration?.timeChanges.valueOrNull ?? Duration.zero,
      bufferedPosition: _player.bufferedPosition,
      speed: _player.speed,
      queueIndex: eventData.event.currentIndex,
      errorMessage: "Couldn't load music"
    );
  }

  Future<void> dispose() async {
    await _player.dispose();
  }
}

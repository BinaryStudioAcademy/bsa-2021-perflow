import 'dart:async';
import 'package:audio_service/audio_service.dart';
import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';
import 'package:just_audio/just_audio.dart';
import 'package:perflow/api_urls.dart';
import 'package:perflow/models/auth/auth_user.dart';
import 'package:perflow/models/playback/playback_actions.dart';
import 'package:perflow/models/playback/playback_data.dart';
import 'package:perflow/models/playback/playback_duration.dart';
import 'package:perflow/models/playback/playback_repeat_mode.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/playback/playback_handler.dart';
import 'package:perflow/services/songs/songs_api.dart';
import 'package:rxdart/rxdart.dart';

@Singleton(signalsReady: true)
class PlaybackService {
  final _player = AudioPlayer();
  late final PlaybackHandler _audioHandler;
  final AuthService _authService;
  final SongsApi _songsApi;

  late final StreamSubscription<AuthUser?> _authSubscription;
  late final StreamSubscription<bool> _playingSubscription;

  final _playbackSubject = BehaviorSubject<PlaybackData?>.seeded(null);

  final _defaultActions = PlaybackActions(
    playing: false,
    shuffleEnabled: false,
    repeatMode: RepeatMode.none
  );

  PlaybackService(
    this._authService,
    this._songsApi
  ) {
    _authSubscription = _authService.authStateChanges.listen(_handleAuthChange);
    _playingSubscription = _player.playingStream.listen(_handlePlayingChange);
    _initialize();
  }

  PlaybackData? get currentPlayback => _playbackSubject.value;

  Stream<PlaybackData?> get playbackChanges => _playbackSubject
    .distinct((dataA, dataB) => dataA == dataB);

  Stream<bool> get playbackStatusChanges => _player.playingStream;

  Future<void> _initialize() async {
    _audioHandler = await AudioService.init(
      builder: () => PlaybackHandler(_player, this),
      config: const AudioServiceConfig(
        androidNotificationChannelId: 'com.bsa.perflow.channel.audio',
        androidNotificationChannelName: 'Perflow playback',
        artDownscaleWidth: 384,
        artDownscaleHeight: 384
      ),
    );

    GetIt.instance.signalReady(this);
  }

  Future<void> setSongById(int songId) async {
    final response = await _songsApi.get(songId);

    if(!response.isSuccessful) {
      return;
    }

    final song = Song.fromJson(response.body);
    return setSong(song);
  }

  Future<void> setSong(Song song) async {
    _playbackSubject.add(PlaybackData(
      song: song,
      actions: _playbackSubject.value?.actions ?? _defaultActions
    ));

    final songDuration = await _player.setUrl('${ApiUrls.base}/api/songs/file?blobId=${song.blobId}');

    if(songDuration != null) {
      _playbackSubject.add(PlaybackData(
        song: song,
        actions: _playbackSubject.value?.actions ?? _defaultActions,
        duration: PlaybackDuration(
          max: songDuration,
          timeChanges: BehaviorSubject<Duration>()..addStream(_player.positionStream)
        ),
      ));
    }

    play();
  }

  Future<void> stop() {
    _playbackSubject.add(null);
    return _audioHandler.stop();
  }

  Future<void> play() => _audioHandler.play();

  Future<void> pause() => _audioHandler.pause();

  Future<void> seekPercent(double percent) =>
    _audioHandler.seek((_playbackSubject.valueOrNull?.duration?.max ?? Duration.zero) * percent);

  Future<void> seek(Duration position) => _audioHandler.seek(position);

  void _handleAuthChange(AuthUser? authUser) {
    if(authUser == null) {
      _player.stop();
      _playbackSubject.add(null);
    }
  }

  void _handlePlayingChange(bool playing) {
    final currentPlaybackData = _playbackSubject.value;

    if(currentPlaybackData == null) {
      return;
    }

    _playbackSubject.add(
      _playbackSubject.value?.copyWith(
        actions: currentPlaybackData.actions.copyWith(
          playing: playing
        )
      )
    );
  }

  @disposeMethod
  void dispose() {
    _authSubscription.cancel();
    _playingSubscription.cancel();
    _player.dispose();
  }
}

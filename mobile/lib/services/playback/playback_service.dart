import 'dart:async';
import 'package:audio_service/audio_service.dart';
import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';
import 'package:just_audio/just_audio.dart';
import 'package:perflow/models/auth/auth_user.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/playback/playback_handler.dart';

@Singleton(signalsReady: true)
class PlaybackService {
  final AuthService _authService;
  late final StreamSubscription<AuthUser?> _authSubscription;

  final player = AudioPlayer();
  late final PlaybackHandler _audioHandler;

  PlaybackService(this._authService) {
    _authSubscription = _authService.authStateChanges.listen(_handleAuthChange);
    _initialize();
  }

  Future<void> _initialize() async {
    _audioHandler = await AudioService.init(
      builder: () => PlaybackHandler(
        player,
        _authService
      ),
      config: const AudioServiceConfig(
        androidNotificationChannelId: 'com.bsa.perflow.channel.audio',
        androidNotificationChannelName: 'Perflow playback',
        artDownscaleWidth: 384,
        artDownscaleHeight: 384
      ),
    );

    GetIt.instance.signalReady(this);
  }

  Future<void> playSong(Song song) async {
    return _audioHandler.playSong(song);
  }

  void _handleAuthChange(AuthUser? authUser) {
    if(authUser == null) {
      player.stop();
    }
  }

  @disposeMethod
  void dispose() {
    _authSubscription.cancel();
    player.dispose();
  }
}

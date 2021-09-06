import 'package:audio_service/audio_service.dart';
import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/playback/playback_handler.dart';

@Singleton(as: PlaybackHandler, signalsReady: true, dispose: PlaybackHandlerRegister.disposeHandler)
class PlaybackHandlerRegister extends PlaybackHandler {
  PlaybackHandlerRegister._(AuthService authService) : super(authService);

  static PlaybackHandler? _handler;

  @factoryMethod
  static PlaybackHandler registerPlaybackHandler(AuthService authService) {
    if(_handler == null) {
      _handler = PlaybackHandler(authService);
      _initializeAudioService();
    }

    return _handler!;
  }

  static Future<void> _initializeAudioService() async {
    _handler = await AudioService.init(
      builder: () => _handler!,
      config: const AudioServiceConfig(
        androidNotificationChannelId: 'com.bsa.perflow.channel.audio',
        androidNotificationChannelName: 'Perflow playback',
        artDownscaleWidth: 512,
        artDownscaleHeight: 512
      )
    );

    GetIt.instance.signalReady(_handler);
  }

  static Future<void> disposeHandler(PlaybackHandler handler) {
    return handler.dispose();
  }
}

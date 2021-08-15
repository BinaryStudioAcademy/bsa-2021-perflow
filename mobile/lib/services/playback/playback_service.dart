import 'dart:io';
import 'package:injectable/injectable.dart';
import 'package:just_audio/just_audio.dart';
import 'package:perflow/api_urls.dart';
import 'package:perflow/services/auth/auth_service.dart';

@Singleton()
class PlaybackService {
  final AuthService _authService;

  final _player = AudioPlayer();

  PlaybackService(this._authService);

  Future<void> play() async {
    await setUrl('/api/songs/file?blobId=d3097e44-92b4-4d4f-b3ec-493b8dd416f5');
    _player.play();
  }

  Future<void> pause() async {
    _player.pause();
  }

  Future<void> setUrl(String url) async {
    if(!url.startsWith('http')) {
      url = url.startsWith('/')
        ? ApiUrls.base + url
        : ApiUrls.base + '/' + url;
    }

    final token = await _authService.getToken();

    await _player.setUrl(
      url,
      headers: token != null ? { HttpHeaders.authorizationHeader: 'Bearer ' + token } : null
    );
  }
}

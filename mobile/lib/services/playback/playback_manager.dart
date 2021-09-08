import 'dart:async';
import 'package:injectable/injectable.dart';
import 'package:logger/logger.dart';
import 'package:perflow/models/auth/auth_user.dart';
import 'package:perflow/models/playback_sync/playback_sync_data.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/playback/playback_handler.dart';
import 'package:perflow/services/playback/playback_queue.dart';
import 'package:perflow/services/playback/playback_sync_hub.dart';
import 'package:rxdart/rxdart.dart';

@Singleton()
class PlaybackManager {
  final _logger = Logger();

  final AuthService _authService;
  final PlaybackSyncHub _syncHub;
  final PlaybackQueue _playbackQueue;
  final PlaybackHandler _playbackHandler;

  final _unsubscribe = PublishSubject<void>();

  PlaybackManager(
    this._playbackHandler,
    this._playbackQueue,
    this._authService,
    this._syncHub
  ) {
    _playbackHandler.onSeek
      .takeUntil(_unsubscribe)
      .listen((time) => _postSyncChange(time: time.inSeconds));

    _playbackHandler.songChanges
      .takeUntil(_unsubscribe)
      .where((song) => song != null)
      .listen((song) => _postSyncChange(songId: song!.id, time: 0));

    _playbackHandler.actionsChanges
      .takeUntil(_unsubscribe)
      .map((actions) => actions.playing)
      .listen((_) => _postSyncChange());

    _authService.authStateChanges
      .takeUntil(_unsubscribe)
      .listen(_handleAuthChange);

    _syncHub.syncDataChanges
      .takeUntil(_unsubscribe)
      .listen(_handleSyncChange);
  }

  Future<void> _handleAuthChange(AuthUser? authUser) async {
    if(authUser == null) {
      await _playbackHandler.stop();
    }
  }

  Future<void> _postSyncChange({
    int? songId,
    int? time
  }) async {
    songId ??= _playbackHandler.currentSong?.id;
    time ??= _playbackHandler.currentDuration?.current.inSeconds;

    if(songId == null || time == null) {
      return;
    }

    final data = PlaybackSyncData(songId, time);

    if(data == _syncHub.currentSyncData) {
      return;
    }

    _logger.i('Send sync\nid: $songId\ntime: $time');

    await _syncHub.sendSyncData(data);
  }

  Future<void> _handleSyncChange(PlaybackSyncData syncData) async {
    _logger.i('Receive sync\nid: ${syncData.songId}\ntime: ${syncData.time}');

    if(_playbackHandler.currentSong?.id != syncData.songId) {
      await _playbackQueue.setSongById(syncData.songId);
    }

    await _playbackHandler.seekWithoutSync(Duration(seconds: syncData.time));
  }

  @disposeMethod
  void dispose() {
    _unsubscribe.add(null);
  }
}

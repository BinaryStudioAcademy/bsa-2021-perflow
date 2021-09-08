import 'dart:async';
import 'package:fast_immutable_collections/fast_immutable_collections.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/models/playback/playback_actions.dart';
import 'package:perflow/models/playback/playback_duration.dart';
import 'package:perflow/models/playback/playback_queue_data.dart';
import 'package:perflow/models/playback/playback_repeat_mode.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/playback/playback_handler.dart';
import 'package:perflow/services/songs/songs_api.dart';
import 'package:rxdart/rxdart.dart';

@Singleton()
class PlaybackQueue {
  final PlaybackHandler _playbackHandler;
  final SongsApi _songsApi;

  late final StreamSubscription _skipToNextSubscription;
  late final StreamSubscription _skipToPreviousSubscription;
  late final StreamSubscription<PlaybackDuration?> _durationSubscription;
  late final StreamSubscription<bool> _shuffleSubscription;
  StreamSubscription<Duration>? _timeSubscription;

  IList<Song> _queueOrder = IList<Song>();

  final _queueSubject = BehaviorSubject<QueueData>.seeded(
    QueueData(
      currentIndex: 0,
      songs: IList<Song>()
    )
  );

  PlaybackQueue(
    this._playbackHandler,
    this._songsApi
  ) {
    _skipToNextSubscription = _playbackHandler.onSkipToNext
      .listen((_) => skipToNext());

    _skipToPreviousSubscription = _playbackHandler.onSkipToPrevious
      .listen((_) => skipToPrevious());

    _durationSubscription = _playbackHandler.durationChanges
      .listen(_handleDurationChange);

    _shuffleSubscription = _playbackHandler.actionsChanges
      .map((actions) => actions.shuffleEnabled)
      .distinct()
      .listen((shuffleEnabled) => shuffleEnabled ? _enableShuffle() : _disableShuffle());
  }

  Stream<QueueData> get queueChanges => _queueSubject;

  PlaybackActions get currentActions => _playbackHandler.currentActions;

  QueueData get currentQueue => _queueSubject.value;

  int get currentIndex => currentQueue.currentIndex;

  IList<Song> get currentSongs => currentQueue.songs;

  Song get currentSong => currentSongs[currentIndex];

  Future<void> setSongById(int songId) async {
    return setSong(await _getSongById(songId));
  }

  Future<void> setSong(Song song) {
    _setQueueData(
      index: 0,
      songs: currentSongs.clear().add(song)
    );

    return _updatePlayback();
  }

  Future<void> setSongs(Iterable<Song> songs, {int index = 0}) {
    _setQueueData(
      index: index,
      songs: currentSongs.clear().addAll(songs)
    );

    if(currentActions.shuffleEnabled) {
      _enableShuffle();
    }

    return _updatePlayback();
  }

  Future<void> addSongs(Iterable<Song> songs) {
    _setQueueData(
      songs: currentSongs.addAll(songs)
    );

    return _updatePlayback();
  }

  Future<void> addToStartById(int songId) async {
    return addToStart(await _getSongById(songId));
  }

  FutureOr<void> addToStart(Song song) {
    _setQueueData(
      songs: currentSongs.insert(0, song)
    );

    return _updatePlayback();
  }

  Future<void> addNext(Song song) {
    _setQueueData(
      songs: currentSongs.insert(currentIndex + 1, song)
    );

    return _updatePlayback();
  }

  Future<void> insertById(int index, int songId) async {
    return insert(index, await _getSongById(songId));
  }

  FutureOr<void> insert(int index, Song song) async {
    if(index < 0 || index >= currentSongs.length) {
      return;
    }

    _setQueueData(
      songs: currentSongs.insert(index, song)
    );

    return _updatePlayback();
  }

  Future<void> addToEndById(int songId) async {
    return addToEnd(await _getSongById(songId));
  }

  FutureOr<void> addToEnd(Song song) {
    _setQueueData(
      songs: currentSongs.add(song)
    );

    return _updatePlayback();
  }

  Future<void> skipToNext() {
    _setQueueData(index: currentIndex + 1);

    return _updatePlayback();
  }

  Future<void> skipToPrevious() {
    _setQueueData(index: currentIndex - 1);

    return _updatePlayback();
  }

  Future<void> skipTo(int index) {
    _setQueueData(index: index);

    return _updatePlayback();
  }

  Future<void> _updatePlayback() async {
    final index = currentIndex;

    if(index < 0) {
      await _beforeQueueStart();
      return;
    }

    if(index >= currentQueue.songs.length) {
      await _afterQueueEnd();
      return;
    }

    if(currentSong.id == _playbackHandler.currentSong?.id) {
      return;
    }

    return _playbackHandler.setSong(currentSong);
  }

  FutureOr<void> _beforeQueueStart() async {
    if(currentSongs.isEmpty) {
      return clear();
    }

    if(currentActions.repeatMode == RepeatMode.context) {
      _setQueueData(index: currentQueue.songs.length - 1);
      return _playbackHandler.setSong(currentSong);
    }

    _setQueueData(index: 0);
    await _playbackHandler.pause();
    await _playbackHandler.seekPercent(0);
  }

  FutureOr<void> _afterQueueEnd() async {
    if(currentSongs.isEmpty) {
      return clear();
    }

    if(currentActions.repeatMode == RepeatMode.context) {
      _setQueueData(index: 0);
      return _playbackHandler.setSong(currentSong);
    }

    _setQueueData(index: currentQueue.songs.length - 1);
    await _playbackHandler.pause();
    await _playbackHandler.seekPercent(0);
  }

  FutureOr<void> _onTrackEnd() async {
    if(currentActions.repeatMode == RepeatMode.item) {
      return _playbackHandler.seekPercent(0);
    }

    return skipToNext();
  }

  Future<void> clear() {
    _resetQueue();

    return _playbackHandler.stop();
  }

  Future<Song> _getSongById(int songId) async {
    final response = await _songsApi.get(songId);

    if(!response.isSuccessful) {
      throw ApiCallException("Couldn't load song with id: $songId");
    }

    return Song.fromJson(response.body);
  }

  void _resetQueue() {
    _setQueueData(
      index: 0,
      songs: currentSongs.clear()
    );
  }

  void _setQueueData({
    int? index,
    IList<Song>? songs
  }) {
    _queueSubject.add(
      currentQueue.copyWith(
        currentIndex: index ?? currentIndex,
        songs: songs ?? currentSongs
      )
    );
  }

  void _handleDurationChange(PlaybackDuration? duration) {
    _timeSubscription?.cancel();
    _timeSubscription = null;

    if(duration == null) {
      return;
    }

    _timeSubscription = duration.timeChanges
      .listen((time) {
        if(time.inSeconds == duration.max.inSeconds) {
          _onTrackEnd();
        }
      }
    );
  }

  void _enableShuffle() {
    if(currentIndex == currentSongs.length - 1) {
      return;
    }

    _queueOrder = currentSongs;

    final shuffled = currentSongs
      .skip(currentIndex + 1)
      .toIList()
      .shuffle();

    _setQueueData(
      index: currentIndex,
      songs: currentSongs
        .removeRange(currentIndex + 1, currentSongs.length)
        .addAll(shuffled)
    );
  }

  void _disableShuffle() {
    _setQueueData(
      index: currentIndex,
      songs: currentSongs
        .sortLike(_queueOrder)
    );
  }

  @disposeMethod
  FutureOr<void> dispose() {
    _skipToNextSubscription.cancel();
    _skipToPreviousSubscription.cancel();
    _durationSubscription.cancel();
    _shuffleSubscription.cancel();
    _timeSubscription?.cancel();
  }
}

import 'package:bloc/bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/playback/playback_time.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/playback/playback_service.dart';
import 'package:perflow/services/songs/songs_api.dart';
import 'package:rxdart/rxdart.dart';

part 'playback_state.dart';
part 'playback_cubit.freezed.dart';

class PlaybackCubit extends Cubit<PlaybackState> {
  final _songsApi = getService<SongsApi>();
  final _playbackService = getService<PlaybackService>();

  PlaybackCubit() : super(PlaybackState.none());

  Future<void> setById(int songId) async {
    final songResponse = await _songsApi.get(songId);
    final song = Song.fromJson(songResponse.body);

    await set(song);
  }

  Future<void> set(Song song) async {
    _playbackService.playSong(song);
    emit(PlaybackState.playing(
      song: song,
      playbackTimeChanges: getTimeStream()
    ));
  }

  Future<void> play() {
    return _playbackService.player.play();
  }

  Future<void> pause() {
    return _playbackService.player.stop();
  }

  Future<void> stop() {
    emit(PlaybackState.none());
    return _playbackService.player.stop();
  }

  Stream<PlaybackTime> getTimeStream() => CombineLatestStream(
    [ _playbackService.player.positionStream, _playbackService.player.durationStream ],
      (durations) => PlaybackTime(
      current: durations[0] as Duration,
      max: durations[1] as Duration
    )
  );
}

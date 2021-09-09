import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/playback/playback_data.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/playback/playback_handler.dart';
import 'package:rxdart/rxdart.dart';

part 'playback_state.dart';
part 'playback_cubit.freezed.dart';

class PlaybackCubit extends Cubit<PlaybackState> {
  final _playbackHandler = getService<PlaybackHandler>();

  late final StreamSubscription<PlaybackData?> _playbackChangesSubscription;

  PlaybackCubit() : super(PlaybackState.none()) {
    _playbackChangesSubscription = CombineLatestStream<dynamic, PlaybackData?>(
      [
        _playbackHandler.songChanges,
        _playbackHandler.actionsChanges,
        _playbackHandler.durationChanges
      ],
      (data) {
        final Song? song = data[0];

        if(song == null) {
          return null;
        }

        return PlaybackData(
          song: song,
          actions: data[1],
          duration: data[2]
        );
      }
    ).listen(_handlePlaybackChange);
  }

  void _handlePlaybackChange(PlaybackData? data) async {
    if(data == null) {
      emit(PlaybackState.none());
      return;
    }

    emit(PlaybackState.playing(data));
  }

  @override
  Future<void> close() async {
    await _playbackChangesSubscription.cancel();
    return super.close();
  }
}

import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/playback/playback_queue_data.dart';
import 'package:perflow/services/playback/playback_queue.dart';
part 'playback_queue_state.dart';
part 'playback_queue_cubit.freezed.dart';

class PlaybackQueueCubit extends Cubit<PlaybackQueueState> {
  late final StreamSubscription<QueueData> _queueSubscription;

  PlaybackQueueCubit() : super(PlaybackQueueState.empty()) {
    _queueSubscription = getService<PlaybackQueue>()
      .queueChanges
      .listen(_handleQueueChanges);
  }

  void _handleQueueChanges(QueueData queueData) {
    if(queueData.songs.isEmpty) {
      emit(PlaybackQueueState.empty());
      return;
    }

    emit(PlaybackQueueState.playing(queueData));
  }

  @override
  Future<void> close() {
    _queueSubscription.cancel();

    return super.close();
  }
}

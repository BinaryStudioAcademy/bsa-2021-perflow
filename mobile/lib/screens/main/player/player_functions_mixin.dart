import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/playback/playback_actions.dart';
import 'package:perflow/models/playback/playback_repeat_mode.dart';
import 'package:perflow/services/playback/playback_handler.dart';
import 'package:perflow/services/playback/playback_queue.dart';

mixin PlayerFunctionsMixin {
  void updateShuffle(PlaybackActions actions) {
    getService<PlaybackHandler>().setShuffle(!actions.shuffleEnabled);
  }

  void setPlaying(bool playing) {
    if(playing) {
      getService<PlaybackHandler>().play();
    }
    else {
      getService<PlaybackHandler>().pause();
    }
  }

  void skipToNext() {
    getService<PlaybackQueue>().skipToNext();
  }

  void skipToPrevious() {
    getService<PlaybackQueue>().skipToPrevious();
  }

  void updateRepeat(PlaybackActions actions) {
    getService<PlaybackHandler>().setRepeat(
        RepeatMode.values[(actions.repeatMode.index + 1) % RepeatMode.values.length]
    );
  }
}

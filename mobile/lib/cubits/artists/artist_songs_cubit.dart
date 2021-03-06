import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/models/common/author_type.dart';
import 'package:perflow/models/songs/artist_song.dart';
import 'package:perflow/services/playback/playback_handler.dart';
import 'package:perflow/services/playback/playback_queue.dart';
import 'package:perflow/services/songs/songs_api.dart';

class ArtistSongsCubit extends ApiCallCubit<List<ArtistSong>> {
  final _songsApi = getService<SongsApi>();
  final _playbackQueue = getService<PlaybackQueue>();
  final _playbackHandler = getService<PlaybackHandler>();

  ArtistSongsCubit(int id) : super() {
    loadSongs(id);
  }

  Future<void> loadSongs(int id) {
    return handleApiCall(_loadSongs(id));
  }

  Future<List<ArtistSong>> _loadSongs(int id) async {
    var response = await _songsApi.getTopSongsByAuthor(id, 10, AuthorType.artist.index);

    if(!response.isSuccessful) {
      throw const ApiCallException("Couldn't load songs");
    }

    return (response.body as List<dynamic>)
      .map((dynamic songJson) => ArtistSong.fromJson(songJson))
      .toList();
  }

  Future<void> play() async {
    final currentState = state;

    if(currentState is! ApiCallStateData<List<ArtistSong>>) {
      return;
    }

    await _playbackQueue.setSongs(currentState.data);
    await _playbackHandler.play();
  }
}

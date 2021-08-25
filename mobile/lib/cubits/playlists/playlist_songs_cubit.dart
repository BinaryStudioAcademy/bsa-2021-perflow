import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/models/songs/playlist_song.dart';
import 'package:perflow/services/playback/playback_service.dart';
import 'package:perflow/services/playlists/playlists_api.dart';

class PlaylistSongsCubit extends ApiCallCubit<List<PlaylistSong>> {
  final _playlistsApi = getService<PlaylistsApi>();
  final _playbackService = getService<PlaybackService>();

  PlaylistSongsCubit(int id) : super() {
    loadSongs(id);
  }

  Future<void> loadSongs(int id) {
    return handleApiCall(_loadSongs(id));
  }

  Future<List<PlaylistSong>> _loadSongs(int id) async {
    var response = await _playlistsApi.getPlaylistSongs(id);

    if(!response.isSuccessful) {
      throw const ApiCallException("Couldn't load songs");
    }

    return (response.body as List<dynamic>)
      .map((dynamic songJson) => PlaylistSong.fromJson(songJson))
      .toList();
  }

  Future<void> play() async {
    state.maybeWhen(
      orElse: () {},
      data: (songs) {
        if(songs.isNotEmpty) {
          _playbackService.setSongById(songs.first.id);
        }
      }
    );
  }
}

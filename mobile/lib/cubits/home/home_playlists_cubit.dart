import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/playlists/playlist_info.dart';
import 'package:perflow/services/playlists/playlists_api.dart';

class HomePlaylistsCubit extends ApiCallCubit<List<PlaylistInfo>> {
  final PlaylistsApi _playlistsApi = getService<PlaylistsApi>();

  HomePlaylistsCubit(List<int> ids) : super() {
    loadPlaylists(ids);
  }

  Future<void> loadPlaylists(List<int> ids) {
    return handleApiCall(_loadPlaylists(ids));
  }

  Future<List<PlaylistInfo>> _loadPlaylists(List<int> ids) async {
    var requests = ids.map((id) => _playlistsApi.getPlaylist(id));

    var playlistResponses = await Future.wait(requests);

    return playlistResponses.map((response) {
      if (!response.isSuccessful) {
        throw const ApiCallException("Couldn't load playlists");
      }

      return PlaylistInfo.fromJson(response.body);
    }).toList();
  }
}

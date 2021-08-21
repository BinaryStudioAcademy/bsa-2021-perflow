import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/playlists/playlist_info.dart';
import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/services/playlists/playlists_api.dart';

class PlaylistInfoCubit extends ApiCallCubit<PlaylistInfo> {
  final PlaylistsApi _playlistsApi = getService<PlaylistsApi>();

  PlaylistInfoCubit(int playlistId) : super() {
    loadInfo(playlistId);
  }

  Future<void> loadInfo(int id) {
    return handleApiCall(_loadInfo(id));
  }

  Future<PlaylistInfo> _loadInfo(int id) async {
    var response = await _playlistsApi.getPlaylist(id);

    if(!response.isSuccessful) {
      throw const ApiCallException("Couldn't load playlist info");
    }

    return PlaylistInfo.fromJson(response.body);
  }
}

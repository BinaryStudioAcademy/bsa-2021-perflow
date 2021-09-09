import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/playlists/playlist_simplified.dart';
import 'package:perflow/services/playlists/playlists_api.dart';

class RecommendedPlaylistsCubit extends ApiCallCubit<List<PlaylistSimplified>> {
  final _playlistsApi = getService<PlaylistsApi>();

  RecommendedPlaylistsCubit() : super() {
    loadInfo();
  }

  Future<void> loadInfo() {
    return handleApiCall(_loadPlaylists());
  }

  Future<List<PlaylistSimplified>> _loadPlaylists() async {
    var response = await _playlistsApi.getRecommendedPlaylists();

    if (!response.isSuccessful) {
      throw const ApiCallException("Couldn't load liked albums");
    }

    return (response.body as List<dynamic>)
        .map((dynamic albumJson) => PlaylistSimplified.fromJson(albumJson))
        .toList();
  }
}

import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/playlists/playlist_simplified.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/reactions/playlists_reactions_api.dart';

class LikedPlaylistsCubit extends ApiCallCubit<List<PlaylistSimplified>> {
  final PlaylistsReactionsApi _playlistsReactionsApi = getService<PlaylistsReactionsApi>();
  final _authService = getService<AuthService>();

  LikedPlaylistsCubit() : super(){
    loadInfo();
  }

  Future<void> loadInfo() {
    return handleApiCall(_loadPlaylists(_authService.currentAuthState!.id));
  }

  Future<List<PlaylistSimplified>> _loadPlaylists(int id) async {
    var response = await _playlistsReactionsApi.getLikedPlaylistsByUserId(id);

    if(!response.isSuccessful) {
      throw const ApiCallException("Couldn't load liked albums");
    }

    return (response.body as List<dynamic>)
      .map((dynamic albumJson) => PlaylistSimplified.fromJson(albumJson))
      .toList();
  }
}
import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/playlists/playlist_simplified.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/playlists/playlists_api.dart';

class UsersPlaylistsCubit extends ApiCallCubit<List<PlaylistSimplified>> {
  final PlaylistsApi _playlistsApi = getService<PlaylistsApi>();
  final _authService = getService<AuthService>();

  UsersPlaylistsCubit() : super(){
    loadInfo();
  }

  Future<void> loadInfo() {
    return handleApiCall(_loadPlaylists(_authService.currentAuthState!.id));
  }

  Future<List<PlaylistSimplified>> _loadPlaylists(int id) async {
    var response = await _playlistsApi.getUsersPlaylists(id);

    if(!response.isSuccessful) {
      throw const ApiCallException("Couldn't load playlists");
    }

    return (response.body as List<dynamic>)
      .map((dynamic playlistJson) => PlaylistSimplified.fromJson(playlistJson))
      .toList();
  }
}
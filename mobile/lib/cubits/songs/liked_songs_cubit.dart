import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/songs/songs_api.dart';

class LikedSongsCubit extends ApiCallCubit<List<Song>>{
  final SongsApi _songsApi = getService<SongsApi>();
  final _authService = getService<AuthService>();

  LikedSongsCubit() : super(){
    loadInfo();
  }

  Future<void> loadInfo() {
    return handleApiCall(_loadSongs(_authService.currentAuthState!.id));
  }

  Future<List<Song>> _loadSongs(int id) async {
    var response = await _songsApi.getLiked();

    if(!response.isSuccessful) {
      throw const ApiCallException("Couldn't load liked albums");
    }

    return (response.body as List<dynamic>)
      .map((dynamic albumJson) => Song.fromJson(albumJson))
      .toList();
  }
}

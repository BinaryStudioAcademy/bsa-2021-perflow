import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/recently_played/recently_played_song.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/recently_played/recently_played_api.dart';
import 'package:perflow/services/songs/songs_api.dart';

class RecentlyPlayedCubit extends ApiCallCubit<List<Song>> {
  final _recenltyPlayedApi = getService<RecentlyPlayedApi>();
  final _songsApi = getService<SongsApi>();
  final _authService = getService<AuthService>();

  RecentlyPlayedCubit() : super() {
    loadInfo();
  }

  Future<void> loadInfo() {
    return handleApiCall(_loadInfo());
  }

  Future<List<Song>> _loadInfo() async {
    var response =
        await _recenltyPlayedApi.getSongs(_authService.currentAuthState!.id, 5);

    if (!response.isSuccessful) {
      throw const ApiCallException("Couldn't load recently played info");
    }

    var recentlyPlayedInfos = (response.body as List<dynamic>)
        .map((dynamic albumJson) => RecentlyPlayedSong.fromJson(albumJson))
        .toList();

    var requests = recentlyPlayedInfos.map(
      (e) => _songsApi.get(e.id),
    );

    var songResponses = await Future.wait(requests);

    return songResponses.map((response) {
      if (!response.isSuccessful) {
        throw const ApiCallException("Couldn't load songs");
      }

      return Song.fromJson(response.body);
    }).toList();
  }
}

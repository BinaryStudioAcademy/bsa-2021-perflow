import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/recently_played/recently_played_song.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/recently_played/recently_played_api.dart';

class RecentlyPlayedCubit extends ApiCallCubit<List<RecentlyPlayedSong>> {
  final _recenltyPlayedApi = getService<RecentlyPlayedApi>();
  final _authService = getService<AuthService>();

  RecentlyPlayedCubit() : super() {
    loadInfo();
  }

  Future<void> loadInfo() {
    return handleApiCall(_loadInfo());
  }

  Future<List<RecentlyPlayedSong>> _loadInfo() async {
    var response =
        await _recenltyPlayedApi.getSongs(_authService.currentAuthState!.id, 5);

    if (!response.isSuccessful) {
      throw const ApiCallException("Couldn't load recently played info");
    }

    return (response.body as List<dynamic>)
        .map((dynamic albumJson) => RecentlyPlayedSong.fromJson(albumJson))
        .toList();
  }
}

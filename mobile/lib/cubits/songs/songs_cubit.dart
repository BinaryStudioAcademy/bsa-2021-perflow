import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/songs/songs_api.dart';

class SongsCubit extends ApiCallCubit<List<Song>> {
  final SongsApi _songsApi = getService<SongsApi>();

  SongsCubit(List<int> ids) : super() {
    loadSongs(ids);
  }

  Future<void> loadSongs(List<int> ids) {
    return handleApiCall(_loadSongs(ids));
  }

  Future<List<Song>> _loadSongs(List<int> ids) async {
    var requests = ids.map((id) => _songsApi.get(id));

    var songResponses = await Future.wait(requests);

    return songResponses.map((response) {
      if (!response.isSuccessful) {
        throw const ApiCallException("Couldn't load songs");
      }

      return Song.fromJson(response.body);
    }).toList();
  }
}

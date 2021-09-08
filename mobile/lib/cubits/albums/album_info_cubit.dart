import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/cubits/common/api_call_state.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/models/albums/album_info.dart';
import 'package:perflow/services/albums/albums_api.dart';
import 'package:perflow/services/playback/playback_handler.dart';
import 'package:perflow/services/playback/playback_queue.dart';

class AlbumInfoCubit extends ApiCallCubit<AlbumInfo> {
  final AlbumsApi _albumsApi = getService<AlbumsApi>();
  final _playbackQueue = getService<PlaybackQueue>();
  final _playbackHandler = getService<PlaybackHandler>();

  AlbumInfoCubit(int albumId) : super() {
    loadInfo(albumId);
  }

  Future<void> loadInfo(int id) {
    return handleApiCall(_loadInfo(id));
  }

  Future<AlbumInfo> _loadInfo(int id) async {
    var response = await _albumsApi.getAlbum(id);

    if(!response.isSuccessful) {
      throw const ApiCallException("Couldn't load album info");
    }

    return AlbumInfo.fromJson(response.body);
  }

  Future<void> play() async {
    final currentState = state;

    if(currentState is! ApiCallStateData<AlbumInfo>) {
      return;
    }

    await _playbackQueue.setSongs(currentState.data.songs);
    await _playbackHandler.play();
  }
}

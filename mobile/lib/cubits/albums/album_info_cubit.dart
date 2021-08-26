import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/models/albums/album_info.dart';
import 'package:perflow/services/albums/albums_api.dart';

class AlbumInfoCubit extends ApiCallCubit<AlbumInfo> {
  final AlbumsApi _albumsApi = getService<AlbumsApi>();

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
}

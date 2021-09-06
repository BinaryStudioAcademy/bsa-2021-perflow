import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/services/albums/albums_api.dart';

class NewReleasesCubit extends ApiCallCubit<List<AlbumSimplified>> {
  final AlbumsApi _albumsApi = getService<AlbumsApi>();

  NewReleasesCubit() : super() {
    loadInfo();
  }

  Future<void> loadInfo() {
    return handleApiCall(_loadAlbums());
  }

  Future<List<AlbumSimplified>> _loadAlbums() async {
    var response = await _albumsApi.getNewReleases();

    if (!response.isSuccessful) {
      throw const ApiCallException("Couldn't load liked albums");
    }

    return (response.body as List<dynamic>)
        .map((dynamic albumJson) => AlbumSimplified.fromJson(albumJson))
        .toList();
  }
}

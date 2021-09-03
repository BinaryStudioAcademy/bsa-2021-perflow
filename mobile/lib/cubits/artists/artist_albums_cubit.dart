import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/models/albums/album_by_artist.dart';
import 'package:perflow/models/common/author_type.dart';
import 'package:perflow/services/albums/albums_api.dart';

class ArtistAlbumsCubit extends ApiCallCubit<List<AlbumByArtist>> {
  final _albumsApi = getService<AlbumsApi>();

  ArtistAlbumsCubit(int id) : super() {
    loadAlbums(id);
  }

  Future<void> loadAlbums(int id) {
    return handleApiCall(_loadAlbums(id));
  }

  Future<List<AlbumByArtist>> _loadAlbums(int id) async {
    var response = await _albumsApi.getTopAlbumsByAuthor(id, AuthorType.artist.index);

    if(!response.isSuccessful) {
      throw const ApiCallException("Couldn't load songs");
    }

    return (response.body as List<dynamic>)
      .map((dynamic songJson) => AlbumByArtist.fromJson(songJson))
      .toList();
  }
}

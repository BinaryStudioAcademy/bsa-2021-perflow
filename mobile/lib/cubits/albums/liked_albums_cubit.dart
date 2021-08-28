import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/reactions/albums_reactions_api.dart';

class LikedAlbumsCubit extends ApiCallCubit<List<AlbumSimplified>>{
  final AlbumsReactionsApi _albumsReactionsApi = getService<AlbumsReactionsApi>();
  final _authService = getService<AuthService>();

  LikedAlbumsCubit() : super(){
    loadInfo();
  }

  Future<void> loadInfo() {
    return handleApiCall(_loadAlbums(_authService.currentAuthState!.id));
  }

  Future<List<AlbumSimplified>> _loadAlbums(int id) async {
    var response = await _albumsReactionsApi.getAlbumsByUserId(id);

    if(!response.isSuccessful) {
      throw const ApiCallException("Couldn't load liked albums");
    }

    return (response.body as List<dynamic>)
      .map((dynamic albumJson) => AlbumSimplified.fromJson(albumJson))
      .toList();
  }
}

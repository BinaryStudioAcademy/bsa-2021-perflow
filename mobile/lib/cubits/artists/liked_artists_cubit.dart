import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:perflow/services/auth/auth_service.dart';
import 'package:perflow/services/reactions/artists_reactions_api.dart';

class LikedArtistsCubit extends ApiCallCubit<List<ArtistSimplified>> {
  final ArtistsReactionsApi _artistsReactionsApi = getService<ArtistsReactionsApi>();
  final _authService = getService<AuthService>();

  LikedArtistsCubit() : super(){
    loadInfo();
  }

  Future<void> loadInfo() {
    return handleApiCall(_loadArtists(_authService.currentAuthState!.id));
  }

  Future<List<ArtistSimplified>> _loadArtists(int id) async {
    var response = await _artistsReactionsApi.getArtistsByUserId(id);

    if(!response.isSuccessful) {
      throw const ApiCallException("Couldn't load liked albums");
    }

    return (response.body as List<dynamic>)
      .map((dynamic albumJson) => ArtistSimplified.fromJson(albumJson))
      .toList();
  }

  
}
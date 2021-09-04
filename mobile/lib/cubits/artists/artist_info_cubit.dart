import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/models/artists/artist_info.dart';
import 'package:perflow/services/artists/artists_api.dart';

class ArtistInfoCubit extends ApiCallCubit<ArtistInfo> {
  final ArtistsApi _artistsApi = getService<ArtistsApi>();

  ArtistInfoCubit(int artistId) : super() {
    loadInfo(artistId);
  }

  Future<void> loadInfo(int id) {
    return handleApiCall(_loadInfo(id));
  }

  Future<ArtistInfo> _loadInfo(int id) async {
    var response = await _artistsApi.getArtist(id);

    if(!response.isSuccessful) {
      throw const ApiCallException("Couldn't load artist info");
    }

    return ArtistInfo.fromJson(response.body);
  }
}

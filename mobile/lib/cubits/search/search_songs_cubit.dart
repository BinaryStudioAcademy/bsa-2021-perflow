import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/search/search_params.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/search/search_api.dart';

class SearchSongsCubit extends ApiCallCubit<List<Song>> {
  final SearchApi _searchApi = getService<SearchApi>();
  final SearchParams searchParams;

  SearchSongsCubit(this.searchParams) : super() {
    loadInfo();
  }

  Future<void> loadInfo() {
    return handleApiCall(_loadSongs(searchParams));
  }

  Future<List<Song>> _loadSongs(SearchParams searchParams) async {
    var response = await _searchApi.getSongs(
        searchParams.searchTerm, searchParams.page, searchParams.itemsOnPage);

    print(response.body);

    if (!response.isSuccessful) {
      throw const ApiCallException("Couldn't load searched songs");
    }

    return (response.body as List<dynamic>)
        .map((dynamic albumJson) => Song.fromJson(albumJson))
        .toList();
  }
}

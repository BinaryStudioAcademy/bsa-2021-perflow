import 'package:perflow/cubits/search/search_common_cubit.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/playlists/playlist_simplified.dart';
import 'package:perflow/models/search/search_params.dart';
import 'package:perflow/services/search/search_api.dart';

class SearchPlaylistsCubit extends SearchCommonCubit<PlaylistSimplified> {
  SearchPlaylistsCubit()
      : super((SearchParams searchParams) async {
          return await getService<SearchApi>().getPlaylists(
              searchParams.searchTerm,
              searchParams.page,
              searchParams.itemsOnPage);
        });

  @override
  List<PlaylistSimplified> mapToEntityList(List<dynamic> entities) {
    return entities
        .map((dynamic albumJson) => PlaylistSimplified.fromJson(albumJson))
        .toList();
  }
}

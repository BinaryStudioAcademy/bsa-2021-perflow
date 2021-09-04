import 'package:perflow/cubits/search/search_common_cubit.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/albums/album_simplified.dart';
import 'package:perflow/models/search/search_params.dart';
import 'package:perflow/services/search/search_api.dart';

class SearchAlbumsCubit extends SearchCommonCubit<AlbumSimplified> {
  SearchAlbumsCubit()
      : super((SearchParams searchParams) async {
          return await getService<SearchApi>().getAlbums(
              searchParams.searchTerm,
              searchParams.page,
              searchParams.itemsOnPage);
        });

  @override
  List<AlbumSimplified> mapToEntityList(List<dynamic> entities) {
    return entities
        .map((dynamic albumJson) => AlbumSimplified.fromJson(albumJson))
        .toList();
  }
}

import 'package:perflow/cubits/search/search_common_cubit.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/artists/artist_simplified.dart';
import 'package:perflow/models/search/search_params.dart';
import 'package:perflow/services/search/search_api.dart';

class SearchArtistsCubit extends SearchCommonCubit<ArtistSimplified> {
  SearchArtistsCubit()
      : super((SearchParams searchParams) async {
          return await getService<SearchApi>().getArtists(
              searchParams.searchTerm,
              searchParams.page,
              searchParams.itemsOnPage);
        });

  @override
  List<ArtistSimplified> mapToEntityList(List<dynamic> entities) {
    return entities
        .map((dynamic albumJson) => ArtistSimplified.fromJson(albumJson))
        .toList();
  }
}

import 'package:perflow/cubits/search/search_common_cubit.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/models/search/search_params.dart';
import 'package:perflow/models/songs/song.dart';
import 'package:perflow/services/search/search_api.dart';

class SearchSongsCubit extends SearchCommonCubit<Song> {
  SearchSongsCubit()
      : super((SearchParams searchParams) async {
          return await getService<SearchApi>().getSongs(searchParams.searchTerm,
              searchParams.page, searchParams.itemsOnPage);
        });

  @override
  List<Song> mapToEntityList(List<dynamic> entities) {
    return entities
        .map((dynamic albumJson) => Song.fromJson(albumJson))
        .toList();
  }
}

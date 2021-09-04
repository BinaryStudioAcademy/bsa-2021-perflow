import 'package:chopper/chopper.dart';
import 'package:perflow/cubits/common/api_call_cubit.dart';
import 'package:perflow/cubits/common/api_call_exception.dart';
import 'package:perflow/models/search/search_params.dart';

abstract class SearchCommonCubit<EntityType>
    extends ApiCallCubit<List<EntityType>> {
  final Future<Response<dynamic>> Function(SearchParams searchParams)
      callApiFunction;
  bool isLoading = false;

  SearchCommonCubit(this.callApiFunction) : super();

  Future<void> loadInfo(SearchParams searchParams) {
    return handleApiCall(_loadSongs(searchParams));
  }

  Future<List<EntityType>> _loadSongs(SearchParams searchParams) async {
    if (searchParams.searchTerm == '') return <EntityType>[];

    isLoading = true;

    var response = await callApiFunction.call(searchParams);

    if (!response.isSuccessful) {
      throw const ApiCallException("Couldn't load searched songs");
    }

    isLoading = false;

    return mapToEntityList(response.body as List<dynamic>);
  }

  List<EntityType> mapToEntityList(List<dynamic> entities);
}

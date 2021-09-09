import 'package:chopper/chopper.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/services/chopper/chopper_service.dart';

part 'search_api.chopper.dart';

@Singleton()
@ChopperApi(baseUrl: 'api/search')
abstract class SearchApi extends ChopperService {
  @Get(path: 'songs')
  Future<Response> getSongs(
      @Query() String searchTerm, @Query() int page, @Query() int itemsOnPage);

  @Get(path: 'albums/true')
  Future<Response> getAlbums(
      @Query() String searchTerm, @Query() int page, @Query() int itemsOnPage);

  @Get(path: 'artists')
  Future<Response> getArtists(
      @Query() String searchTerm, @Query() int page, @Query() int itemsOnPage);

  @Get(path: 'playlists')
  Future<Response> getPlaylists(
      @Query() String searchTerm, @Query() int page, @Query() int itemsOnPage);

  @factoryMethod
  static SearchApi create(Chopper chopper) => _$SearchApi(chopper.client);
}

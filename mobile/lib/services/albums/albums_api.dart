import 'package:chopper/chopper.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/services/chopper/chopper_service.dart';

part 'albums_api.chopper.dart';

@Singleton()
@ChopperApi(baseUrl: 'api/albums')
abstract class AlbumsApi extends ChopperService {
  @Get(path: '{id}')
  Future<Response> getAlbum(@Path() int id);

  @Get(path: 'songs/{id}')
  Future<Response> getAlbumSongs(@Path() int id);

  @Get(path: 'byArtist/{authorId}')
  Future<Response> getTopAlbumsByAuthor(@Path() int authorId, @Query() int authorType);

  @factoryMethod
  static AlbumsApi create(Chopper chopper) => _$AlbumsApi(chopper.client);
}

import 'package:chopper/chopper.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/services/chopper/chopper_service.dart';

part 'artists_api.chopper.dart';

@Singleton()
@ChopperApi(baseUrl: 'api/artists')
abstract class ArtistsApi extends ChopperService {
  @Get(path: '{id}')
  Future<Response> getArtist(@Path() int id);

  @factoryMethod
  static ArtistsApi create(Chopper chopper) => _$ArtistsApi(chopper.client);
}

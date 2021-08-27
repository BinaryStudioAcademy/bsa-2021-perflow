import 'package:chopper/chopper.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/services/chopper/chopper_service.dart';

part 'albums_reactions_api.chopper.dart';

@Singleton()
@ChopperApi(baseUrl: 'api/albumreaction')
abstract class AlbumsReactionsApi extends ChopperService {

  @Get(path: '{id}')
  Future<Response> getAlbumsByUserId(@Path() int id);

  @factoryMethod
  static AlbumsReactionsApi create(Chopper chopper) => _$AlbumsReactionsApi(chopper.client);
}

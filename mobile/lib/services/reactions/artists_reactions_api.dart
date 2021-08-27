import 'package:chopper/chopper.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/services/chopper/chopper_service.dart';

part 'artists_reactions_api.chopper.dart';

@Singleton()
@ChopperApi(baseUrl: 'api/artistreaction')
abstract class ArtistsReactionsApi extends ChopperService {

  @Get(path: '{id}')
  Future<Response> getArtistsByUserId(@Path() int id);

  @factoryMethod
  static ArtistsReactionsApi create(Chopper chopper) => _$ArtistsReactionsApi(chopper.client);
}

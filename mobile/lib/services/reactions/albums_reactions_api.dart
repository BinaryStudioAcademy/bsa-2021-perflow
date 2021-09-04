import 'package:chopper/chopper.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/models/reactions/new_album_reaction.dart';
import 'package:perflow/services/chopper/chopper_service.dart';

part 'albums_reactions_api.chopper.dart';

@Singleton()
@ChopperApi(baseUrl: 'api/albumreaction')
abstract class AlbumsReactionsApi extends ChopperService {

  @Get(path: '{id}')
  Future<Response> getAlbumsByUserId(@Path() int id);

  @Post(path: 'like')
  Future<Response> likeAlbum(@Body() NewAlbumReaction reaction);

  @Post(path: 'removeLike')
  Future<Response> unlikeAlbum(@Body() NewAlbumReaction reaction);

  @factoryMethod
  static AlbumsReactionsApi create(Chopper chopper) => _$AlbumsReactionsApi(chopper.client);
}

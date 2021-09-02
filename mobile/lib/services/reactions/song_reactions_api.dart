import 'package:chopper/chopper.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/models/reactions/new_song_reaction.dart';
import 'package:perflow/services/chopper/chopper_service.dart';

part 'song_reactions_api.chopper.dart';

@Singleton()
@ChopperApi(baseUrl: 'api/songreaction')
abstract class SongsReactionsApi extends ChopperService {

  @Post(path: 'like')
  Future<Response> likeSong(@Body() NewSongReaction reaction);

  @Post(path: 'removeLike')
  Future<Response> unlikeSong(@Body() NewSongReaction reaction);

  @factoryMethod
  static SongsReactionsApi create(Chopper chopper) => _$SongsReactionsApi(chopper.client);
}

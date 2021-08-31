import 'package:chopper/chopper.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/models/reactions/new_playlist_reaction.dart';
import 'package:perflow/services/chopper/chopper_service.dart';

part 'playlists_reactions_api.chopper.dart';

@Singleton()
@ChopperApi(baseUrl: 'api/playlistreaction')
abstract class PlaylistsReactionsApi extends ChopperService {

  @Get(path: 'liked/{id}')
  Future<Response> getLikedPlaylistsByUserId(@Path() int id);

  @Post(path: 'like')
  Future<Response> likePlaylist(@Body() NewPlaylistReaction reaction);

  @Post(path: 'removeLike')
  Future<Response> unlikePlaylist(@Body() NewPlaylistReaction reaction);

  @factoryMethod
  static PlaylistsReactionsApi create(Chopper chopper) => _$PlaylistsReactionsApi(chopper.client);
}

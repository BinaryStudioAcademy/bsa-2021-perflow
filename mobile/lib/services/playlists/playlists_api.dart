import 'package:chopper/chopper.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/services/chopper/chopper_service.dart';

part 'playlists_api.chopper.dart';

@Singleton()
@ChopperApi(baseUrl: 'api/playlists')
abstract class PlaylistsApi extends ChopperService {
  @Get(path: '{id}')
  Future<Response> getPlaylist(@Path() int id);

  @Get(path: 'songs/{id}')
  Future<Response> getPlaylistSongs(@Path() int id);

  @factoryMethod
  static PlaylistsApi create(Chopper chopper) => _$PlaylistsApi(chopper.client);
}

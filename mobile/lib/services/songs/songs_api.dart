import 'dart:async';
import 'package:chopper/chopper.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/services/chopper/chopper_service.dart';

part 'songs_api.chopper.dart';

@Singleton()
@ChopperApi(baseUrl: 'api/songs')
abstract class SongsApi extends ChopperService {
  @Get(path: '{id}')
  Future<Response> get(@Path() int id);

  @Get(path: 'topSongs/{authorId}')
  Future<Response> getTopSongsByAuthor(@Path() int authorId, @Query() int count, @Query() int authorType);

  @factoryMethod
  static SongsApi create(Chopper chopper) => _$SongsApi(chopper.client);
}

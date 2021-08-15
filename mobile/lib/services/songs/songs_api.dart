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

  @factoryMethod
  static SongsApi create(Chopper chopper) => _$SongsApi(chopper.client);
}

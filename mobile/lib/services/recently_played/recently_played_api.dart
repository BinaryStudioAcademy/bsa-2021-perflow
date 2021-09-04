import 'package:chopper/chopper.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/services/chopper/chopper_service.dart';

part 'recently_played_api.chopper.dart';

@Singleton()
@ChopperApi(baseUrl: 'api/recentlyplayed')
abstract class RecentlyPlayedApi extends ChopperService {
  @Get(path: 'get/recent/songs/{amount}')
  Future<Response> getSongs(@Query() int userid, @Path() int amount);

  @factoryMethod
  static RecentlyPlayedApi create(Chopper chopper) =>
      _$RecentlyPlayedApi(chopper.client);
}

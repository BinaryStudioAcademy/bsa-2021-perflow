import 'package:chopper/chopper.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/models/recently_played/recently_played.dart';
import 'package:perflow/services/chopper/chopper_service.dart';

part 'recently_played_api.chopper.dart';

@Singleton()
@ChopperApi(baseUrl: 'api/recentlyplayed')
abstract class RecentlyPlayedApi extends ChopperService {
  @Post(path: 'add')
  Future<Response> addInfo(@Body() RecentlyPlayed rpInfo);

  @Get(path: 'get/recent/songs/{amount}')
  Future<Response> getSongs(@Query() int userid, @Path() int amount);

  @factoryMethod
  static RecentlyPlayedApi create(Chopper chopper) =>
      _$RecentlyPlayedApi(chopper.client);
}

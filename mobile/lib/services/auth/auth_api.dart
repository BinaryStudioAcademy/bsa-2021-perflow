import 'package:chopper/chopper.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/models/auth/login_data.dart';
import 'package:perflow/models/auth/register_data.dart';
import 'package:perflow/services/chopper/chopper_service.dart';

part 'auth_api.chopper.dart';

@Singleton()
@ChopperApi(baseUrl: 'api/auth')
abstract class AuthApi extends ChopperService {
  @Post(path: 'register')
  Future<Response> register(@Body() RegisterData registerData);

  @Post(path: 'login')
  Future<Response> login(@Body() LoginData loginData);

  @Get(path: 'test')
  Future<Response> test();

  @factoryMethod
  static AuthApi create(Chopper chopper) => _$AuthApi(chopper.client);
}

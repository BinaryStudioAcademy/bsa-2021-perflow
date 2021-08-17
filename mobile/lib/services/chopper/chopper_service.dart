import 'package:chopper/chopper.dart';
import 'package:injectable/injectable.dart';
import 'package:perflow/api_urls.dart';
import 'package:perflow/services/auth/auth_interceptor.dart';

@Singleton()
class Chopper extends ChopperClient {
  late final client = ChopperClient(
    baseUrl: ApiUrls.base,
    converter: const JsonConverter(),
    errorConverter: const JsonConverter(),
    interceptors: <dynamic>[
      AuthInterceptor()
    ]
  );
}

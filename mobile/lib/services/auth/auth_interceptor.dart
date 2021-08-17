import 'dart:async';
import 'dart:io';
import 'package:chopper/chopper.dart';
import 'package:get_it/get_it.dart';
import 'package:perflow/helpers/get_service.dart';
import 'package:perflow/services/auth/auth_service.dart';

class AuthInterceptor extends RequestInterceptor {
  @override
  FutureOr<Request> onRequest(Request request) async {
    if(!GetIt.instance.isRegistered<AuthService>()) {
      return request;
    }

    final token = await getService<AuthService>().getToken();

    if(token == null) {
      return request;
    }

    return applyHeader(request, HttpHeaders.authorizationHeader, 'Bearer ' + token, override: true);
  }
}

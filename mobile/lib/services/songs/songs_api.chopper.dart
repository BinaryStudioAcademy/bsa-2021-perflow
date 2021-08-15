// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'songs_api.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line, always_specify_types, prefer_const_declarations
class _$SongsApi extends SongsApi {
  _$SongsApi([ChopperClient? client]) {
    if (client == null) return;
    this.client = client;
  }

  @override
  final definitionType = SongsApi;

  @override
  Future<Response<dynamic>> get(int id) {
    final $url = 'api/songs/$id';
    final $request = Request('GET', $url, client.baseUrl);
    return client.send<dynamic, dynamic>($request);
  }
}

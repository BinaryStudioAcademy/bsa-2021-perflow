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

  @override
  Future<Response<dynamic>> getTopSongsByAuthor(
      int authorId, int count, int authorType) {
    final $url = 'api/songs/topSongs/$authorId';
    final $params = <String, dynamic>{'count': count, 'authorType': authorType};
    final $request = Request('GET', $url, client.baseUrl, parameters: $params);
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> getLiked() {
    final $url = 'api/songs/liked';
    final $request = Request('GET', $url, client.baseUrl);
    return client.send<dynamic, dynamic>($request);
  }
}

// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'albums_api.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line, always_specify_types, prefer_const_declarations
class _$AlbumsApi extends AlbumsApi {
  _$AlbumsApi([ChopperClient? client]) {
    if (client == null) return;
    this.client = client;
  }

  @override
  final definitionType = AlbumsApi;

  @override
  Future<Response<dynamic>> getAlbum(int id) {
    final $url = 'api/albums/$id';
    final $request = Request('GET', $url, client.baseUrl);
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> getAlbumSongs(int id) {
    final $url = 'api/albums/songs/$id';
    final $request = Request('GET', $url, client.baseUrl);
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> getTopAlbumsByAuthor(int authorId, int authorType) {
    final $url = 'api/albums/byArtist/$authorId';
    final $params = <String, dynamic>{'authorType': authorType};
    final $request = Request('GET', $url, client.baseUrl, parameters: $params);
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> getNewReleases() {
    final $url = 'api/albums/new-releases';
    final $request = Request('GET', $url, client.baseUrl);
    return client.send<dynamic, dynamic>($request);
  }
}

// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'albums_reactions_api.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line, always_specify_types, prefer_const_declarations
class _$AlbumsReactionsApi extends AlbumsReactionsApi {
  _$AlbumsReactionsApi([ChopperClient? client]) {
    if (client == null) return;
    this.client = client;
  }

  @override
  final definitionType = AlbumsReactionsApi;

  @override
  Future<Response<dynamic>> getAlbumsByUserId(int id) {
    final $url = 'api/albumreaction/$id';
    final $request = Request('GET', $url, client.baseUrl);
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> likeAlbum(NewAlbumReaction reaction) {
    final $url = 'api/albumreaction/like';
    final $body = reaction;
    final $request = Request('POST', $url, client.baseUrl, body: $body);
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> unlikeAlbum(NewAlbumReaction reaction) {
    final $url = 'api/albumreaction/removeLike';
    final $body = reaction;
    final $request = Request('POST', $url, client.baseUrl, body: $body);
    return client.send<dynamic, dynamic>($request);
  }
}

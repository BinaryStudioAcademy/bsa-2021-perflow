// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'playlists_reactions_api.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line, always_specify_types, prefer_const_declarations
class _$PlaylistsReactionsApi extends PlaylistsReactionsApi {
  _$PlaylistsReactionsApi([ChopperClient? client]) {
    if (client == null) return;
    this.client = client;
  }

  @override
  final definitionType = PlaylistsReactionsApi;

  @override
  Future<Response<dynamic>> getLikedPlaylistsByUserId(int id) {
    final $url = 'api/playlistreaction/liked/$id';
    final $request = Request('GET', $url, client.baseUrl);
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> likePlaylist(NewPlaylistReaction reaction) {
    final $url = 'api/playlistreaction/like';
    final $body = reaction;
    final $request = Request('POST', $url, client.baseUrl, body: $body);
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> unlikePlaylist(NewPlaylistReaction reaction) {
    final $url = 'api/playlistreaction/removeLike';
    final $body = reaction;
    final $request = Request('POST', $url, client.baseUrl, body: $body);
    return client.send<dynamic, dynamic>($request);
  }
}

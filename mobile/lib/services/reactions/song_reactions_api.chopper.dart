// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'song_reactions_api.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line, always_specify_types, prefer_const_declarations
class _$SongsReactionsApi extends SongsReactionsApi {
  _$SongsReactionsApi([ChopperClient? client]) {
    if (client == null) return;
    this.client = client;
  }

  @override
  final definitionType = SongsReactionsApi;

  @override
  Future<Response<dynamic>> likeSong(NewSongReaction reaction) {
    final $url = 'api/songreaction/like';
    final $body = reaction;
    final $request = Request('POST', $url, client.baseUrl, body: $body);
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> unlikeSong(NewSongReaction reaction) {
    final $url = 'api/songreaction/removeLike';
    final $body = reaction;
    final $request = Request('POST', $url, client.baseUrl, body: $body);
    return client.send<dynamic, dynamic>($request);
  }
}

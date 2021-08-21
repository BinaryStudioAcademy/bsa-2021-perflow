// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'playlists_api.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line, always_specify_types, prefer_const_declarations
class _$PlaylistsApi extends PlaylistsApi {
  _$PlaylistsApi([ChopperClient? client]) {
    if (client == null) return;
    this.client = client;
  }

  @override
  final definitionType = PlaylistsApi;

  @override
  Future<Response<dynamic>> getPlaylist(int id) {
    final $url = 'api/playlists/$id';
    final $request = Request('GET', $url, client.baseUrl);
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> getPlaylistSongs(int id) {
    final $url = 'api/playlists/songs/$id';
    final $request = Request('GET', $url, client.baseUrl);
    return client.send<dynamic, dynamic>($request);
  }
}

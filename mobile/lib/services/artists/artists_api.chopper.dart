// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'artists_api.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line, always_specify_types, prefer_const_declarations
class _$ArtistsApi extends ArtistsApi {
  _$ArtistsApi([ChopperClient? client]) {
    if (client == null) return;
    this.client = client;
  }

  @override
  final definitionType = ArtistsApi;

  @override
  Future<Response<dynamic>> getArtist(int id) {
    final $url = 'api/artists/$id';
    final $request = Request('GET', $url, client.baseUrl);
    return client.send<dynamic, dynamic>($request);
  }
}

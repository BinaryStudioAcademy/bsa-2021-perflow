// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'artists_reactions_api.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line, always_specify_types, prefer_const_declarations
class _$ArtistsReactionsApi extends ArtistsReactionsApi {
  _$ArtistsReactionsApi([ChopperClient? client]) {
    if (client == null) return;
    this.client = client;
  }

  @override
  final definitionType = ArtistsReactionsApi;

  @override
  Future<Response<dynamic>> getArtistsByUserId(int id) {
    final $url = 'api/artistreaction/$id';
    final $request = Request('GET', $url, client.baseUrl);
    return client.send<dynamic, dynamic>($request);
  }
}

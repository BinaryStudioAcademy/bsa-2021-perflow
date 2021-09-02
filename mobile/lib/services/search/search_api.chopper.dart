// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'search_api.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line, always_specify_types, prefer_const_declarations
class _$SearchApi extends SearchApi {
  _$SearchApi([ChopperClient? client]) {
    if (client == null) return;
    this.client = client;
  }

  @override
  final definitionType = SearchApi;

  @override
  Future<Response<dynamic>> getSongs(
      String searchTerm, int page, int itemsOnPage) {
    final $url = 'api/search/songs';
    final $params = <String, dynamic>{
      'searchTerm': searchTerm,
      'page': page,
      'itemsOnPage': itemsOnPage
    };
    final $request = Request('GET', $url, client.baseUrl, parameters: $params);
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> getAlbums(
      String searchTerm, int page, int itemsOnPage) {
    final $url = 'api/search/albums';
    final $params = <String, dynamic>{
      'searchTerm': searchTerm,
      'page': page,
      'itemsOnPage': itemsOnPage
    };
    final $request = Request('GET', $url, client.baseUrl, parameters: $params);
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> getArtists(
      String searchTerm, int page, int itemsOnPage) {
    final $url = 'api/search/artists';
    final $params = <String, dynamic>{
      'searchTerm': searchTerm,
      'page': page,
      'itemsOnPage': itemsOnPage
    };
    final $request = Request('GET', $url, client.baseUrl, parameters: $params);
    return client.send<dynamic, dynamic>($request);
  }

  @override
  Future<Response<dynamic>> getPlaylists(
      String searchTerm, int page, int itemsOnPage) {
    final $url = 'api/search/playlists';
    final $params = <String, dynamic>{
      'searchTerm': searchTerm,
      'page': page,
      'itemsOnPage': itemsOnPage
    };
    final $request = Request('GET', $url, client.baseUrl, parameters: $params);
    return client.send<dynamic, dynamic>($request);
  }
}

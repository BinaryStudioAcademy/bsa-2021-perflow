// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'recently_played_api.dart';

// **************************************************************************
// ChopperGenerator
// **************************************************************************

// ignore_for_file: always_put_control_body_on_new_line, always_specify_types, prefer_const_declarations
class _$RecentlyPlayedApi extends RecentlyPlayedApi {
  _$RecentlyPlayedApi([ChopperClient? client]) {
    if (client == null) return;
    this.client = client;
  }

  @override
  final definitionType = RecentlyPlayedApi;

  @override
  Future<Response<dynamic>> getSongs(int userid, int amount) {
    final $url = 'api/recentlyplayed/get/recent/songs/$amount';
    final $params = <String, dynamic>{'userid': userid};
    final $request = Request('GET', $url, client.baseUrl, parameters: $params);
    return client.send<dynamic, dynamic>($request);
  }
}

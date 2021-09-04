// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

import 'package:get_it/get_it.dart' as _i1;
import 'package:injectable/injectable.dart' as _i2;
import 'package:perflow/services/albums/albums_api.dart' as _i11;
import 'package:perflow/services/artists/artists_api.dart' as _i13;
import 'package:perflow/services/auth/auth_api.dart' as _i15;
import 'package:perflow/services/auth/auth_service.dart' as _i16;
import 'package:perflow/services/chopper/chopper_service.dart' as _i3;
import 'package:perflow/services/playback/playback_service.dart' as _i17;
import 'package:perflow/services/playlists/playlists_api.dart' as _i4;
import 'package:perflow/services/reactions/albums_reactions_api.dart' as _i12;
import 'package:perflow/services/reactions/artists_reactions_api.dart' as _i14;
import 'package:perflow/services/reactions/playlists_reactions_api.dart' as _i5;
import 'package:perflow/services/reactions/song_reactions_api.dart' as _i10;
import 'package:perflow/services/recently_played/recently_played_api.dart'
    as _i6;
import 'package:perflow/services/search/search_api.dart' as _i7;
import 'package:perflow/services/search/search_text_edit_service.dart' as _i8;
import 'package:perflow/services/songs/songs_api.dart'
    as _i9; // ignore_for_file: unnecessary_lambdas

// ignore_for_file: lines_longer_than_80_chars
/// initializes the registration of provided dependencies inside of [GetIt]
_i1.GetIt $configureServices(_i1.GetIt get,
    {String? environment, _i2.EnvironmentFilter? environmentFilter}) {
  final gh = _i2.GetItHelper(get, environment, environmentFilter);
  gh.singleton<_i3.Chopper>(_i3.Chopper());
  gh.singleton<_i4.PlaylistsApi>(_i4.PlaylistsApi.create(get<_i3.Chopper>()));
  gh.singleton<_i5.PlaylistsReactionsApi>(
      _i5.PlaylistsReactionsApi.create(get<_i3.Chopper>()));
  gh.singleton<_i6.RecentlyPlayedApi>(
      _i6.RecentlyPlayedApi.create(get<_i3.Chopper>()));
  gh.singleton<_i7.SearchApi>(_i7.SearchApi.create(get<_i3.Chopper>()));
  gh.singleton<_i8.SearchTextEditService>(_i8.SearchTextEditService());
  gh.singleton<_i9.SongsApi>(_i9.SongsApi.create(get<_i3.Chopper>()));
  gh.singleton<_i10.SongsReactionsApi>(
      _i10.SongsReactionsApi.create(get<_i3.Chopper>()));
  gh.singleton<_i11.AlbumsApi>(_i11.AlbumsApi.create(get<_i3.Chopper>()));
  gh.singleton<_i12.AlbumsReactionsApi>(
      _i12.AlbumsReactionsApi.create(get<_i3.Chopper>()));
  gh.singleton<_i13.ArtistsApi>(_i13.ArtistsApi.create(get<_i3.Chopper>()));
  gh.singleton<_i14.ArtistsReactionsApi>(
      _i14.ArtistsReactionsApi.create(get<_i3.Chopper>()));
  gh.singleton<_i15.AuthApi>(_i15.AuthApi.create(get<_i3.Chopper>()));
  gh.singleton<_i16.AuthService>(_i16.AuthService(get<_i15.AuthApi>()),
      signalsReady: true);
  gh.singleton<_i17.PlaybackService>(
      _i17.PlaybackService(get<_i16.AuthService>(), get<_i9.SongsApi>()),
      signalsReady: true,
      dispose: (i) => i.dispose());
  return get;
}

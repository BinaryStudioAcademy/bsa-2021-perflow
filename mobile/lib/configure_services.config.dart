// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

import 'package:get_it/get_it.dart' as _i1;
import 'package:injectable/injectable.dart' as _i2;
import 'package:perflow/services/albums/albums_api.dart' as _i9;
import 'package:perflow/services/artists/artists_api.dart' as _i11;
import 'package:perflow/services/auth/auth_api.dart' as _i13;
import 'package:perflow/services/auth/auth_service.dart' as _i14;
import 'package:perflow/services/chopper/chopper_service.dart' as _i3;
import 'package:perflow/services/playback/playback_service.dart' as _i15;
import 'package:perflow/services/playlists/playlists_api.dart' as _i4;
import 'package:perflow/services/reactions/albums_reactions_api.dart' as _i10;
import 'package:perflow/services/reactions/artists_reactions_api.dart' as _i12;
import 'package:perflow/services/reactions/playlists_reactions_api.dart' as _i5;
import 'package:perflow/services/reactions/song_reactions_api.dart' as _i8;
import 'package:perflow/services/recently_played/recently_played_api.dart'
    as _i6;
import 'package:perflow/services/songs/songs_api.dart'
    as _i7; // ignore_for_file: unnecessary_lambdas

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
  gh.singleton<_i7.SongsApi>(_i7.SongsApi.create(get<_i3.Chopper>()));
  gh.singleton<_i8.SongsReactionsApi>(
      _i8.SongsReactionsApi.create(get<_i3.Chopper>()));
  gh.singleton<_i9.AlbumsApi>(_i9.AlbumsApi.create(get<_i3.Chopper>()));
  gh.singleton<_i10.AlbumsReactionsApi>(
      _i10.AlbumsReactionsApi.create(get<_i3.Chopper>()));
  gh.singleton<_i11.ArtistsApi>(_i11.ArtistsApi.create(get<_i3.Chopper>()));
  gh.singleton<_i12.ArtistsReactionsApi>(
      _i12.ArtistsReactionsApi.create(get<_i3.Chopper>()));
  gh.singleton<_i13.AuthApi>(_i13.AuthApi.create(get<_i3.Chopper>()));
  gh.singleton<_i14.AuthService>(_i14.AuthService(get<_i13.AuthApi>()),
      signalsReady: true);
  gh.singleton<_i15.PlaybackService>(
      _i15.PlaybackService(get<_i14.AuthService>(), get<_i7.SongsApi>()),
      signalsReady: true,
      dispose: (i) => i.dispose());
  return get;
}

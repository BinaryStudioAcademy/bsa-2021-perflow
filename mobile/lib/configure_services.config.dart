// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

import 'package:flutter_sound/flutter_sound.dart' as _i3;
import 'package:get_it/get_it.dart' as _i1;
import 'package:injectable/injectable.dart' as _i2;
import 'package:perflow/services/albums/albums_api.dart' as _i12;
import 'package:perflow/services/artists/artists_api.dart' as _i14;
import 'package:perflow/services/auth/auth_api.dart' as _i16;
import 'package:perflow/services/auth/auth_service.dart' as _i17;
import 'package:perflow/services/chopper/chopper_service.dart' as _i4;
import 'package:perflow/services/playback/playback_handler.dart' as _i19;
import 'package:perflow/services/playback/playback_handler_register.dart'
    as _i20;
import 'package:perflow/services/playback/playback_manager.dart' as _i23;
import 'package:perflow/services/playback/playback_queue.dart' as _i21;
import 'package:perflow/services/playback/playback_sync_hub.dart' as _i22;
import 'package:perflow/services/playlists/playlists_api.dart' as _i5;
import 'package:perflow/services/reactions/albums_reactions_api.dart' as _i13;
import 'package:perflow/services/reactions/artists_reactions_api.dart' as _i15;
import 'package:perflow/services/reactions/playlists_reactions_api.dart' as _i6;
import 'package:perflow/services/reactions/song_reactions_api.dart' as _i11;
import 'package:perflow/services/recently_played/recently_played_api.dart'
    as _i7;
import 'package:perflow/services/search/search_api.dart' as _i8;
import 'package:perflow/services/search/search_text_edit_service.dart' as _i9;
import 'package:perflow/services/signalr/hub_factory_service.dart' as _i18;
import 'package:perflow/services/songs/songs_api.dart' as _i10;
import 'package:perflow/services/third_party.dart'
    as _i24; // ignore_for_file: unnecessary_lambdas

// ignore_for_file: lines_longer_than_80_chars
/// initializes the registration of provided dependencies inside of [GetIt]
_i1.GetIt $configureServices(_i1.GetIt get,
    {String? environment, _i2.EnvironmentFilter? environmentFilter}) {
  final gh = _i2.GetItHelper(get, environment, environmentFilter);
  final registerThirdPartyServices = _$RegisterThirdPartyServices();
  gh.lazySingleton<_i3.FlutterSoundRecorder>(
      () => registerThirdPartyServices.soundRecorder);
  gh.singleton<_i4.Chopper>(_i4.Chopper());
  gh.singleton<_i5.PlaylistsApi>(_i5.PlaylistsApi.create(get<_i4.Chopper>()));
  gh.singleton<_i6.PlaylistsReactionsApi>(
      _i6.PlaylistsReactionsApi.create(get<_i4.Chopper>()));
  gh.singleton<_i7.RecentlyPlayedApi>(
      _i7.RecentlyPlayedApi.create(get<_i4.Chopper>()));
  gh.singleton<_i8.SearchApi>(_i8.SearchApi.create(get<_i4.Chopper>()));
  gh.singleton<_i9.SearchTextEditService>(_i9.SearchTextEditService());
  gh.singleton<_i10.SongsApi>(_i10.SongsApi.create(get<_i4.Chopper>()));
  gh.singleton<_i11.SongsReactionsApi>(
      _i11.SongsReactionsApi.create(get<_i4.Chopper>()));
  gh.singleton<_i12.AlbumsApi>(_i12.AlbumsApi.create(get<_i4.Chopper>()));
  gh.singleton<_i13.AlbumsReactionsApi>(
      _i13.AlbumsReactionsApi.create(get<_i4.Chopper>()));
  gh.singleton<_i14.ArtistsApi>(_i14.ArtistsApi.create(get<_i4.Chopper>()));
  gh.singleton<_i15.ArtistsReactionsApi>(
      _i15.ArtistsReactionsApi.create(get<_i4.Chopper>()));
  gh.singleton<_i16.AuthApi>(_i16.AuthApi.create(get<_i4.Chopper>()));
  gh.singleton<_i17.AuthService>(_i17.AuthService(get<_i16.AuthApi>()),
      signalsReady: true);
  gh.singleton<_i18.HubFactoryService>(
      _i18.HubFactoryService(get<_i17.AuthService>()));
  gh.singleton<_i19.PlaybackHandler>(
      _i20.PlaybackHandlerRegister.registerPlaybackHandler(
          get<_i17.AuthService>()),
      signalsReady: true,
      dispose: _i20.PlaybackHandlerRegister.disposeHandler);
  gh.singleton<_i21.PlaybackQueue>(
      _i21.PlaybackQueue(get<_i19.PlaybackHandler>(), get<_i10.SongsApi>()),
      dispose: (i) => i.dispose());
  gh.singleton<_i22.PlaybackSyncHub>(
      _i22.PlaybackSyncHub(get<_i18.HubFactoryService>()));
  gh.singleton<_i23.PlaybackManager>(
      _i23.PlaybackManager(
          get<_i19.PlaybackHandler>(),
          get<_i21.PlaybackQueue>(),
          get<_i17.AuthService>(),
          get<_i22.PlaybackSyncHub>()),
      dispose: (i) => i.dispose());
  return get;
}

class _$RegisterThirdPartyServices extends _i24.RegisterThirdPartyServices {}

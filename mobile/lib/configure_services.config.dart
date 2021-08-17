// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

import 'package:get_it/get_it.dart' as _i1;
import 'package:injectable/injectable.dart' as _i2;
import 'package:perflow/services/auth/auth_api.dart' as _i5;
import 'package:perflow/services/auth/auth_service.dart' as _i6;
import 'package:perflow/services/chopper/chopper_service.dart' as _i3;
import 'package:perflow/services/playback/playback_service.dart' as _i7;
import 'package:perflow/services/songs/songs_api.dart'
    as _i4; // ignore_for_file: unnecessary_lambdas

// ignore_for_file: lines_longer_than_80_chars
/// initializes the registration of provided dependencies inside of [GetIt]
_i1.GetIt $configureServices(_i1.GetIt get,
    {String? environment, _i2.EnvironmentFilter? environmentFilter}) {
  final gh = _i2.GetItHelper(get, environment, environmentFilter);
  gh.singleton<_i3.Chopper>(_i3.Chopper());
  gh.singleton<_i4.SongsApi>(_i4.SongsApi.create(get<_i3.Chopper>()));
  gh.singleton<_i5.AuthApi>(_i5.AuthApi.create(get<_i3.Chopper>()));
  gh.singleton<_i6.AuthService>(_i6.AuthService(get<_i5.AuthApi>()),
      signalsReady: true);
  gh.singleton<_i7.PlaybackService>(_i7.PlaybackService(get<_i6.AuthService>()),
      signalsReady: true, dispose: (i) => i.dispose());
  return get;
}

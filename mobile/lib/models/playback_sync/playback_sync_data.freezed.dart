// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides

part of 'playback_sync_data.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

PlaybackSyncData _$PlaybackSyncDataFromJson(Map<String, dynamic> json) {
  return _PlaybacSyncData.fromJson(json);
}

/// @nodoc
class _$PlaybackSyncDataTearOff {
  const _$PlaybackSyncDataTearOff();

  _PlaybacSyncData call(int songId, int time) {
    return _PlaybacSyncData(
      songId,
      time,
    );
  }

  PlaybackSyncData fromJson(Map<String, Object> json) {
    return PlaybackSyncData.fromJson(json);
  }
}

/// @nodoc
const $PlaybackSyncData = _$PlaybackSyncDataTearOff();

/// @nodoc
mixin _$PlaybackSyncData {
  int get songId => throw _privateConstructorUsedError;
  int get time => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $PlaybackSyncDataCopyWith<PlaybackSyncData> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PlaybackSyncDataCopyWith<$Res> {
  factory $PlaybackSyncDataCopyWith(
          PlaybackSyncData value, $Res Function(PlaybackSyncData) then) =
      _$PlaybackSyncDataCopyWithImpl<$Res>;
  $Res call({int songId, int time});
}

/// @nodoc
class _$PlaybackSyncDataCopyWithImpl<$Res>
    implements $PlaybackSyncDataCopyWith<$Res> {
  _$PlaybackSyncDataCopyWithImpl(this._value, this._then);

  final PlaybackSyncData _value;
  // ignore: unused_field
  final $Res Function(PlaybackSyncData) _then;

  @override
  $Res call({
    Object? songId = freezed,
    Object? time = freezed,
  }) {
    return _then(_value.copyWith(
      songId: songId == freezed
          ? _value.songId
          : songId // ignore: cast_nullable_to_non_nullable
              as int,
      time: time == freezed
          ? _value.time
          : time // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc
abstract class _$PlaybacSyncDataCopyWith<$Res>
    implements $PlaybackSyncDataCopyWith<$Res> {
  factory _$PlaybacSyncDataCopyWith(
          _PlaybacSyncData value, $Res Function(_PlaybacSyncData) then) =
      __$PlaybacSyncDataCopyWithImpl<$Res>;
  @override
  $Res call({int songId, int time});
}

/// @nodoc
class __$PlaybacSyncDataCopyWithImpl<$Res>
    extends _$PlaybackSyncDataCopyWithImpl<$Res>
    implements _$PlaybacSyncDataCopyWith<$Res> {
  __$PlaybacSyncDataCopyWithImpl(
      _PlaybacSyncData _value, $Res Function(_PlaybacSyncData) _then)
      : super(_value, (v) => _then(v as _PlaybacSyncData));

  @override
  _PlaybacSyncData get _value => super._value as _PlaybacSyncData;

  @override
  $Res call({
    Object? songId = freezed,
    Object? time = freezed,
  }) {
    return _then(_PlaybacSyncData(
      songId == freezed
          ? _value.songId
          : songId // ignore: cast_nullable_to_non_nullable
              as int,
      time == freezed
          ? _value.time
          : time // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_PlaybacSyncData implements _PlaybacSyncData {
  _$_PlaybacSyncData(this.songId, this.time);

  factory _$_PlaybacSyncData.fromJson(Map<String, dynamic> json) =>
      _$_$_PlaybacSyncDataFromJson(json);

  @override
  final int songId;
  @override
  final int time;

  @override
  String toString() {
    return 'PlaybackSyncData(songId: $songId, time: $time)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is _PlaybacSyncData &&
            (identical(other.songId, songId) ||
                const DeepCollectionEquality().equals(other.songId, songId)) &&
            (identical(other.time, time) ||
                const DeepCollectionEquality().equals(other.time, time)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^
      const DeepCollectionEquality().hash(songId) ^
      const DeepCollectionEquality().hash(time);

  @JsonKey(ignore: true)
  @override
  _$PlaybacSyncDataCopyWith<_PlaybacSyncData> get copyWith =>
      __$PlaybacSyncDataCopyWithImpl<_PlaybacSyncData>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$_$_PlaybacSyncDataToJson(this);
  }
}

abstract class _PlaybacSyncData implements PlaybackSyncData {
  factory _PlaybacSyncData(int songId, int time) = _$_PlaybacSyncData;

  factory _PlaybacSyncData.fromJson(Map<String, dynamic> json) =
      _$_PlaybacSyncData.fromJson;

  @override
  int get songId => throw _privateConstructorUsedError;
  @override
  int get time => throw _privateConstructorUsedError;
  @override
  @JsonKey(ignore: true)
  _$PlaybacSyncDataCopyWith<_PlaybacSyncData> get copyWith =>
      throw _privateConstructorUsedError;
}

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides

part of 'playback_actions.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
class _$PlaybackActionsTearOff {
  const _$PlaybackActionsTearOff();

  _PlaybackActions call(
      {required bool playing,
      required bool shuffleEnabled,
      required RepeatMode repeatMode}) {
    return _PlaybackActions(
      playing: playing,
      shuffleEnabled: shuffleEnabled,
      repeatMode: repeatMode,
    );
  }
}

/// @nodoc
const $PlaybackActions = _$PlaybackActionsTearOff();

/// @nodoc
mixin _$PlaybackActions {
  bool get playing => throw _privateConstructorUsedError;
  bool get shuffleEnabled => throw _privateConstructorUsedError;
  RepeatMode get repeatMode => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $PlaybackActionsCopyWith<PlaybackActions> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PlaybackActionsCopyWith<$Res> {
  factory $PlaybackActionsCopyWith(
          PlaybackActions value, $Res Function(PlaybackActions) then) =
      _$PlaybackActionsCopyWithImpl<$Res>;
  $Res call({bool playing, bool shuffleEnabled, RepeatMode repeatMode});
}

/// @nodoc
class _$PlaybackActionsCopyWithImpl<$Res>
    implements $PlaybackActionsCopyWith<$Res> {
  _$PlaybackActionsCopyWithImpl(this._value, this._then);

  final PlaybackActions _value;
  // ignore: unused_field
  final $Res Function(PlaybackActions) _then;

  @override
  $Res call({
    Object? playing = freezed,
    Object? shuffleEnabled = freezed,
    Object? repeatMode = freezed,
  }) {
    return _then(_value.copyWith(
      playing: playing == freezed
          ? _value.playing
          : playing // ignore: cast_nullable_to_non_nullable
              as bool,
      shuffleEnabled: shuffleEnabled == freezed
          ? _value.shuffleEnabled
          : shuffleEnabled // ignore: cast_nullable_to_non_nullable
              as bool,
      repeatMode: repeatMode == freezed
          ? _value.repeatMode
          : repeatMode // ignore: cast_nullable_to_non_nullable
              as RepeatMode,
    ));
  }
}

/// @nodoc
abstract class _$PlaybackActionsCopyWith<$Res>
    implements $PlaybackActionsCopyWith<$Res> {
  factory _$PlaybackActionsCopyWith(
          _PlaybackActions value, $Res Function(_PlaybackActions) then) =
      __$PlaybackActionsCopyWithImpl<$Res>;
  @override
  $Res call({bool playing, bool shuffleEnabled, RepeatMode repeatMode});
}

/// @nodoc
class __$PlaybackActionsCopyWithImpl<$Res>
    extends _$PlaybackActionsCopyWithImpl<$Res>
    implements _$PlaybackActionsCopyWith<$Res> {
  __$PlaybackActionsCopyWithImpl(
      _PlaybackActions _value, $Res Function(_PlaybackActions) _then)
      : super(_value, (v) => _then(v as _PlaybackActions));

  @override
  _PlaybackActions get _value => super._value as _PlaybackActions;

  @override
  $Res call({
    Object? playing = freezed,
    Object? shuffleEnabled = freezed,
    Object? repeatMode = freezed,
  }) {
    return _then(_PlaybackActions(
      playing: playing == freezed
          ? _value.playing
          : playing // ignore: cast_nullable_to_non_nullable
              as bool,
      shuffleEnabled: shuffleEnabled == freezed
          ? _value.shuffleEnabled
          : shuffleEnabled // ignore: cast_nullable_to_non_nullable
              as bool,
      repeatMode: repeatMode == freezed
          ? _value.repeatMode
          : repeatMode // ignore: cast_nullable_to_non_nullable
              as RepeatMode,
    ));
  }
}

/// @nodoc

class _$_PlaybackActions implements _PlaybackActions {
  _$_PlaybackActions(
      {required this.playing,
      required this.shuffleEnabled,
      required this.repeatMode});

  @override
  final bool playing;
  @override
  final bool shuffleEnabled;
  @override
  final RepeatMode repeatMode;

  @override
  String toString() {
    return 'PlaybackActions(playing: $playing, shuffleEnabled: $shuffleEnabled, repeatMode: $repeatMode)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is _PlaybackActions &&
            (identical(other.playing, playing) ||
                const DeepCollectionEquality()
                    .equals(other.playing, playing)) &&
            (identical(other.shuffleEnabled, shuffleEnabled) ||
                const DeepCollectionEquality()
                    .equals(other.shuffleEnabled, shuffleEnabled)) &&
            (identical(other.repeatMode, repeatMode) ||
                const DeepCollectionEquality()
                    .equals(other.repeatMode, repeatMode)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^
      const DeepCollectionEquality().hash(playing) ^
      const DeepCollectionEquality().hash(shuffleEnabled) ^
      const DeepCollectionEquality().hash(repeatMode);

  @JsonKey(ignore: true)
  @override
  _$PlaybackActionsCopyWith<_PlaybackActions> get copyWith =>
      __$PlaybackActionsCopyWithImpl<_PlaybackActions>(this, _$identity);
}

abstract class _PlaybackActions implements PlaybackActions {
  factory _PlaybackActions(
      {required bool playing,
      required bool shuffleEnabled,
      required RepeatMode repeatMode}) = _$_PlaybackActions;

  @override
  bool get playing => throw _privateConstructorUsedError;
  @override
  bool get shuffleEnabled => throw _privateConstructorUsedError;
  @override
  RepeatMode get repeatMode => throw _privateConstructorUsedError;
  @override
  @JsonKey(ignore: true)
  _$PlaybackActionsCopyWith<_PlaybackActions> get copyWith =>
      throw _privateConstructorUsedError;
}

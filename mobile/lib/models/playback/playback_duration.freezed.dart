// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides

part of 'playback_duration.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
class _$PlaybackDurationTearOff {
  const _$PlaybackDurationTearOff();

  _PlaybackDuration call(
      {required Duration max, required BehaviorSubject<Duration> timeChanges}) {
    return _PlaybackDuration(
      max: max,
      timeChanges: timeChanges,
    );
  }
}

/// @nodoc
const $PlaybackDuration = _$PlaybackDurationTearOff();

/// @nodoc
mixin _$PlaybackDuration {
  Duration get max => throw _privateConstructorUsedError;
  BehaviorSubject<Duration> get timeChanges =>
      throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $PlaybackDurationCopyWith<PlaybackDuration> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PlaybackDurationCopyWith<$Res> {
  factory $PlaybackDurationCopyWith(
          PlaybackDuration value, $Res Function(PlaybackDuration) then) =
      _$PlaybackDurationCopyWithImpl<$Res>;
  $Res call({Duration max, BehaviorSubject<Duration> timeChanges});
}

/// @nodoc
class _$PlaybackDurationCopyWithImpl<$Res>
    implements $PlaybackDurationCopyWith<$Res> {
  _$PlaybackDurationCopyWithImpl(this._value, this._then);

  final PlaybackDuration _value;
  // ignore: unused_field
  final $Res Function(PlaybackDuration) _then;

  @override
  $Res call({
    Object? max = freezed,
    Object? timeChanges = freezed,
  }) {
    return _then(_value.copyWith(
      max: max == freezed
          ? _value.max
          : max // ignore: cast_nullable_to_non_nullable
              as Duration,
      timeChanges: timeChanges == freezed
          ? _value.timeChanges
          : timeChanges // ignore: cast_nullable_to_non_nullable
              as BehaviorSubject<Duration>,
    ));
  }
}

/// @nodoc
abstract class _$PlaybackDurationCopyWith<$Res>
    implements $PlaybackDurationCopyWith<$Res> {
  factory _$PlaybackDurationCopyWith(
          _PlaybackDuration value, $Res Function(_PlaybackDuration) then) =
      __$PlaybackDurationCopyWithImpl<$Res>;
  @override
  $Res call({Duration max, BehaviorSubject<Duration> timeChanges});
}

/// @nodoc
class __$PlaybackDurationCopyWithImpl<$Res>
    extends _$PlaybackDurationCopyWithImpl<$Res>
    implements _$PlaybackDurationCopyWith<$Res> {
  __$PlaybackDurationCopyWithImpl(
      _PlaybackDuration _value, $Res Function(_PlaybackDuration) _then)
      : super(_value, (v) => _then(v as _PlaybackDuration));

  @override
  _PlaybackDuration get _value => super._value as _PlaybackDuration;

  @override
  $Res call({
    Object? max = freezed,
    Object? timeChanges = freezed,
  }) {
    return _then(_PlaybackDuration(
      max: max == freezed
          ? _value.max
          : max // ignore: cast_nullable_to_non_nullable
              as Duration,
      timeChanges: timeChanges == freezed
          ? _value.timeChanges
          : timeChanges // ignore: cast_nullable_to_non_nullable
              as BehaviorSubject<Duration>,
    ));
  }
}

/// @nodoc

class _$_PlaybackDuration extends _PlaybackDuration {
  _$_PlaybackDuration({required this.max, required this.timeChanges})
      : super._();

  @override
  final Duration max;
  @override
  final BehaviorSubject<Duration> timeChanges;

  @override
  String toString() {
    return 'PlaybackDuration(max: $max, timeChanges: $timeChanges)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is _PlaybackDuration &&
            (identical(other.max, max) ||
                const DeepCollectionEquality().equals(other.max, max)) &&
            (identical(other.timeChanges, timeChanges) ||
                const DeepCollectionEquality()
                    .equals(other.timeChanges, timeChanges)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^
      const DeepCollectionEquality().hash(max) ^
      const DeepCollectionEquality().hash(timeChanges);

  @JsonKey(ignore: true)
  @override
  _$PlaybackDurationCopyWith<_PlaybackDuration> get copyWith =>
      __$PlaybackDurationCopyWithImpl<_PlaybackDuration>(this, _$identity);
}

abstract class _PlaybackDuration extends PlaybackDuration {
  factory _PlaybackDuration(
      {required Duration max,
      required BehaviorSubject<Duration> timeChanges}) = _$_PlaybackDuration;
  _PlaybackDuration._() : super._();

  @override
  Duration get max => throw _privateConstructorUsedError;
  @override
  BehaviorSubject<Duration> get timeChanges =>
      throw _privateConstructorUsedError;
  @override
  @JsonKey(ignore: true)
  _$PlaybackDurationCopyWith<_PlaybackDuration> get copyWith =>
      throw _privateConstructorUsedError;
}

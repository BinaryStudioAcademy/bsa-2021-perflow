// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides

part of 'playback_cubit.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
class _$PlaybackStateTearOff {
  const _$PlaybackStateTearOff();

  PlaybackStateNone none() {
    return PlaybackStateNone();
  }

  PlaybackStatePlaying playing(PlaybackData data) {
    return PlaybackStatePlaying(
      data,
    );
  }
}

/// @nodoc
const $PlaybackState = _$PlaybackStateTearOff();

/// @nodoc
mixin _$PlaybackState {
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() none,
    required TResult Function(PlaybackData data) playing,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? none,
    TResult Function(PlaybackData data)? playing,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(PlaybackStateNone value) none,
    required TResult Function(PlaybackStatePlaying value) playing,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(PlaybackStateNone value)? none,
    TResult Function(PlaybackStatePlaying value)? playing,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PlaybackStateCopyWith<$Res> {
  factory $PlaybackStateCopyWith(
          PlaybackState value, $Res Function(PlaybackState) then) =
      _$PlaybackStateCopyWithImpl<$Res>;
}

/// @nodoc
class _$PlaybackStateCopyWithImpl<$Res>
    implements $PlaybackStateCopyWith<$Res> {
  _$PlaybackStateCopyWithImpl(this._value, this._then);

  final PlaybackState _value;
  // ignore: unused_field
  final $Res Function(PlaybackState) _then;
}

/// @nodoc
abstract class $PlaybackStateNoneCopyWith<$Res> {
  factory $PlaybackStateNoneCopyWith(
          PlaybackStateNone value, $Res Function(PlaybackStateNone) then) =
      _$PlaybackStateNoneCopyWithImpl<$Res>;
}

/// @nodoc
class _$PlaybackStateNoneCopyWithImpl<$Res>
    extends _$PlaybackStateCopyWithImpl<$Res>
    implements $PlaybackStateNoneCopyWith<$Res> {
  _$PlaybackStateNoneCopyWithImpl(
      PlaybackStateNone _value, $Res Function(PlaybackStateNone) _then)
      : super(_value, (v) => _then(v as PlaybackStateNone));

  @override
  PlaybackStateNone get _value => super._value as PlaybackStateNone;
}

/// @nodoc

class _$PlaybackStateNone implements PlaybackStateNone {
  _$PlaybackStateNone();

  @override
  String toString() {
    return 'PlaybackState.none()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is PlaybackStateNone);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() none,
    required TResult Function(PlaybackData data) playing,
  }) {
    return none();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? none,
    TResult Function(PlaybackData data)? playing,
    required TResult orElse(),
  }) {
    if (none != null) {
      return none();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(PlaybackStateNone value) none,
    required TResult Function(PlaybackStatePlaying value) playing,
  }) {
    return none(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(PlaybackStateNone value)? none,
    TResult Function(PlaybackStatePlaying value)? playing,
    required TResult orElse(),
  }) {
    if (none != null) {
      return none(this);
    }
    return orElse();
  }
}

abstract class PlaybackStateNone implements PlaybackState {
  factory PlaybackStateNone() = _$PlaybackStateNone;
}

/// @nodoc
abstract class $PlaybackStatePlayingCopyWith<$Res> {
  factory $PlaybackStatePlayingCopyWith(PlaybackStatePlaying value,
          $Res Function(PlaybackStatePlaying) then) =
      _$PlaybackStatePlayingCopyWithImpl<$Res>;
  $Res call({PlaybackData data});

  $PlaybackDataCopyWith<$Res> get data;
}

/// @nodoc
class _$PlaybackStatePlayingCopyWithImpl<$Res>
    extends _$PlaybackStateCopyWithImpl<$Res>
    implements $PlaybackStatePlayingCopyWith<$Res> {
  _$PlaybackStatePlayingCopyWithImpl(
      PlaybackStatePlaying _value, $Res Function(PlaybackStatePlaying) _then)
      : super(_value, (v) => _then(v as PlaybackStatePlaying));

  @override
  PlaybackStatePlaying get _value => super._value as PlaybackStatePlaying;

  @override
  $Res call({
    Object? data = freezed,
  }) {
    return _then(PlaybackStatePlaying(
      data == freezed
          ? _value.data
          : data // ignore: cast_nullable_to_non_nullable
              as PlaybackData,
    ));
  }

  @override
  $PlaybackDataCopyWith<$Res> get data {
    return $PlaybackDataCopyWith<$Res>(_value.data, (value) {
      return _then(_value.copyWith(data: value));
    });
  }
}

/// @nodoc

class _$PlaybackStatePlaying implements PlaybackStatePlaying {
  _$PlaybackStatePlaying(this.data);

  @override
  final PlaybackData data;

  @override
  String toString() {
    return 'PlaybackState.playing(data: $data)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is PlaybackStatePlaying &&
            (identical(other.data, data) ||
                const DeepCollectionEquality().equals(other.data, data)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^ const DeepCollectionEquality().hash(data);

  @JsonKey(ignore: true)
  @override
  $PlaybackStatePlayingCopyWith<PlaybackStatePlaying> get copyWith =>
      _$PlaybackStatePlayingCopyWithImpl<PlaybackStatePlaying>(
          this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() none,
    required TResult Function(PlaybackData data) playing,
  }) {
    return playing(data);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? none,
    TResult Function(PlaybackData data)? playing,
    required TResult orElse(),
  }) {
    if (playing != null) {
      return playing(data);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(PlaybackStateNone value) none,
    required TResult Function(PlaybackStatePlaying value) playing,
  }) {
    return playing(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(PlaybackStateNone value)? none,
    TResult Function(PlaybackStatePlaying value)? playing,
    required TResult orElse(),
  }) {
    if (playing != null) {
      return playing(this);
    }
    return orElse();
  }
}

abstract class PlaybackStatePlaying implements PlaybackState {
  factory PlaybackStatePlaying(PlaybackData data) = _$PlaybackStatePlaying;

  PlaybackData get data => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $PlaybackStatePlayingCopyWith<PlaybackStatePlaying> get copyWith =>
      throw _privateConstructorUsedError;
}

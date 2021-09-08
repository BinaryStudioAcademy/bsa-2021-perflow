// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides

part of 'playback_queue_cubit.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
class _$PlaybackQueueStateTearOff {
  const _$PlaybackQueueStateTearOff();

  PlaybackQueueEmpty empty() {
    return PlaybackQueueEmpty();
  }

  PlaybackQueuePlaying playing(QueueData data) {
    return PlaybackQueuePlaying(
      data,
    );
  }
}

/// @nodoc
const $PlaybackQueueState = _$PlaybackQueueStateTearOff();

/// @nodoc
mixin _$PlaybackQueueState {
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() empty,
    required TResult Function(QueueData data) playing,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? empty,
    TResult Function(QueueData data)? playing,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(PlaybackQueueEmpty value) empty,
    required TResult Function(PlaybackQueuePlaying value) playing,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(PlaybackQueueEmpty value)? empty,
    TResult Function(PlaybackQueuePlaying value)? playing,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PlaybackQueueStateCopyWith<$Res> {
  factory $PlaybackQueueStateCopyWith(
          PlaybackQueueState value, $Res Function(PlaybackQueueState) then) =
      _$PlaybackQueueStateCopyWithImpl<$Res>;
}

/// @nodoc
class _$PlaybackQueueStateCopyWithImpl<$Res>
    implements $PlaybackQueueStateCopyWith<$Res> {
  _$PlaybackQueueStateCopyWithImpl(this._value, this._then);

  final PlaybackQueueState _value;
  // ignore: unused_field
  final $Res Function(PlaybackQueueState) _then;
}

/// @nodoc
abstract class $PlaybackQueueEmptyCopyWith<$Res> {
  factory $PlaybackQueueEmptyCopyWith(
          PlaybackQueueEmpty value, $Res Function(PlaybackQueueEmpty) then) =
      _$PlaybackQueueEmptyCopyWithImpl<$Res>;
}

/// @nodoc
class _$PlaybackQueueEmptyCopyWithImpl<$Res>
    extends _$PlaybackQueueStateCopyWithImpl<$Res>
    implements $PlaybackQueueEmptyCopyWith<$Res> {
  _$PlaybackQueueEmptyCopyWithImpl(
      PlaybackQueueEmpty _value, $Res Function(PlaybackQueueEmpty) _then)
      : super(_value, (v) => _then(v as PlaybackQueueEmpty));

  @override
  PlaybackQueueEmpty get _value => super._value as PlaybackQueueEmpty;
}

/// @nodoc

class _$PlaybackQueueEmpty implements PlaybackQueueEmpty {
  _$PlaybackQueueEmpty();

  @override
  String toString() {
    return 'PlaybackQueueState.empty()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is PlaybackQueueEmpty);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() empty,
    required TResult Function(QueueData data) playing,
  }) {
    return empty();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? empty,
    TResult Function(QueueData data)? playing,
    required TResult orElse(),
  }) {
    if (empty != null) {
      return empty();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(PlaybackQueueEmpty value) empty,
    required TResult Function(PlaybackQueuePlaying value) playing,
  }) {
    return empty(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(PlaybackQueueEmpty value)? empty,
    TResult Function(PlaybackQueuePlaying value)? playing,
    required TResult orElse(),
  }) {
    if (empty != null) {
      return empty(this);
    }
    return orElse();
  }
}

abstract class PlaybackQueueEmpty implements PlaybackQueueState {
  factory PlaybackQueueEmpty() = _$PlaybackQueueEmpty;
}

/// @nodoc
abstract class $PlaybackQueuePlayingCopyWith<$Res> {
  factory $PlaybackQueuePlayingCopyWith(PlaybackQueuePlaying value,
          $Res Function(PlaybackQueuePlaying) then) =
      _$PlaybackQueuePlayingCopyWithImpl<$Res>;
  $Res call({QueueData data});

  $QueueDataCopyWith<$Res> get data;
}

/// @nodoc
class _$PlaybackQueuePlayingCopyWithImpl<$Res>
    extends _$PlaybackQueueStateCopyWithImpl<$Res>
    implements $PlaybackQueuePlayingCopyWith<$Res> {
  _$PlaybackQueuePlayingCopyWithImpl(
      PlaybackQueuePlaying _value, $Res Function(PlaybackQueuePlaying) _then)
      : super(_value, (v) => _then(v as PlaybackQueuePlaying));

  @override
  PlaybackQueuePlaying get _value => super._value as PlaybackQueuePlaying;

  @override
  $Res call({
    Object? data = freezed,
  }) {
    return _then(PlaybackQueuePlaying(
      data == freezed
          ? _value.data
          : data // ignore: cast_nullable_to_non_nullable
              as QueueData,
    ));
  }

  @override
  $QueueDataCopyWith<$Res> get data {
    return $QueueDataCopyWith<$Res>(_value.data, (value) {
      return _then(_value.copyWith(data: value));
    });
  }
}

/// @nodoc

class _$PlaybackQueuePlaying implements PlaybackQueuePlaying {
  _$PlaybackQueuePlaying(this.data);

  @override
  final QueueData data;

  @override
  String toString() {
    return 'PlaybackQueueState.playing(data: $data)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is PlaybackQueuePlaying &&
            (identical(other.data, data) ||
                const DeepCollectionEquality().equals(other.data, data)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^ const DeepCollectionEquality().hash(data);

  @JsonKey(ignore: true)
  @override
  $PlaybackQueuePlayingCopyWith<PlaybackQueuePlaying> get copyWith =>
      _$PlaybackQueuePlayingCopyWithImpl<PlaybackQueuePlaying>(
          this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() empty,
    required TResult Function(QueueData data) playing,
  }) {
    return playing(data);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? empty,
    TResult Function(QueueData data)? playing,
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
    required TResult Function(PlaybackQueueEmpty value) empty,
    required TResult Function(PlaybackQueuePlaying value) playing,
  }) {
    return playing(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(PlaybackQueueEmpty value)? empty,
    TResult Function(PlaybackQueuePlaying value)? playing,
    required TResult orElse(),
  }) {
    if (playing != null) {
      return playing(this);
    }
    return orElse();
  }
}

abstract class PlaybackQueuePlaying implements PlaybackQueueState {
  factory PlaybackQueuePlaying(QueueData data) = _$PlaybackQueuePlaying;

  QueueData get data => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $PlaybackQueuePlayingCopyWith<PlaybackQueuePlaying> get copyWith =>
      throw _privateConstructorUsedError;
}

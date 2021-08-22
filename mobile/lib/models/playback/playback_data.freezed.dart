// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides

part of 'playback_data.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
class _$PlaybackDataTearOff {
  const _$PlaybackDataTearOff();

  _PlaybackState call(
      {required Song song,
      required PlaybackActions actions,
      PlaybackDuration? duration}) {
    return _PlaybackState(
      song: song,
      actions: actions,
      duration: duration,
    );
  }
}

/// @nodoc
const $PlaybackData = _$PlaybackDataTearOff();

/// @nodoc
mixin _$PlaybackData {
  Song get song => throw _privateConstructorUsedError;
  PlaybackActions get actions => throw _privateConstructorUsedError;
  PlaybackDuration? get duration => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $PlaybackDataCopyWith<PlaybackData> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PlaybackDataCopyWith<$Res> {
  factory $PlaybackDataCopyWith(
          PlaybackData value, $Res Function(PlaybackData) then) =
      _$PlaybackDataCopyWithImpl<$Res>;
  $Res call({Song song, PlaybackActions actions, PlaybackDuration? duration});

  $PlaybackActionsCopyWith<$Res> get actions;
  $PlaybackDurationCopyWith<$Res>? get duration;
}

/// @nodoc
class _$PlaybackDataCopyWithImpl<$Res> implements $PlaybackDataCopyWith<$Res> {
  _$PlaybackDataCopyWithImpl(this._value, this._then);

  final PlaybackData _value;
  // ignore: unused_field
  final $Res Function(PlaybackData) _then;

  @override
  $Res call({
    Object? song = freezed,
    Object? actions = freezed,
    Object? duration = freezed,
  }) {
    return _then(_value.copyWith(
      song: song == freezed
          ? _value.song
          : song // ignore: cast_nullable_to_non_nullable
              as Song,
      actions: actions == freezed
          ? _value.actions
          : actions // ignore: cast_nullable_to_non_nullable
              as PlaybackActions,
      duration: duration == freezed
          ? _value.duration
          : duration // ignore: cast_nullable_to_non_nullable
              as PlaybackDuration?,
    ));
  }

  @override
  $PlaybackActionsCopyWith<$Res> get actions {
    return $PlaybackActionsCopyWith<$Res>(_value.actions, (value) {
      return _then(_value.copyWith(actions: value));
    });
  }

  @override
  $PlaybackDurationCopyWith<$Res>? get duration {
    if (_value.duration == null) {
      return null;
    }

    return $PlaybackDurationCopyWith<$Res>(_value.duration!, (value) {
      return _then(_value.copyWith(duration: value));
    });
  }
}

/// @nodoc
abstract class _$PlaybackStateCopyWith<$Res>
    implements $PlaybackDataCopyWith<$Res> {
  factory _$PlaybackStateCopyWith(
          _PlaybackState value, $Res Function(_PlaybackState) then) =
      __$PlaybackStateCopyWithImpl<$Res>;
  @override
  $Res call({Song song, PlaybackActions actions, PlaybackDuration? duration});

  @override
  $PlaybackActionsCopyWith<$Res> get actions;
  @override
  $PlaybackDurationCopyWith<$Res>? get duration;
}

/// @nodoc
class __$PlaybackStateCopyWithImpl<$Res>
    extends _$PlaybackDataCopyWithImpl<$Res>
    implements _$PlaybackStateCopyWith<$Res> {
  __$PlaybackStateCopyWithImpl(
      _PlaybackState _value, $Res Function(_PlaybackState) _then)
      : super(_value, (v) => _then(v as _PlaybackState));

  @override
  _PlaybackState get _value => super._value as _PlaybackState;

  @override
  $Res call({
    Object? song = freezed,
    Object? actions = freezed,
    Object? duration = freezed,
  }) {
    return _then(_PlaybackState(
      song: song == freezed
          ? _value.song
          : song // ignore: cast_nullable_to_non_nullable
              as Song,
      actions: actions == freezed
          ? _value.actions
          : actions // ignore: cast_nullable_to_non_nullable
              as PlaybackActions,
      duration: duration == freezed
          ? _value.duration
          : duration // ignore: cast_nullable_to_non_nullable
              as PlaybackDuration?,
    ));
  }
}

/// @nodoc

class _$_PlaybackState with DiagnosticableTreeMixin implements _PlaybackState {
  _$_PlaybackState({required this.song, required this.actions, this.duration});

  @override
  final Song song;
  @override
  final PlaybackActions actions;
  @override
  final PlaybackDuration? duration;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'PlaybackData(song: $song, actions: $actions, duration: $duration)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'PlaybackData'))
      ..add(DiagnosticsProperty('song', song))
      ..add(DiagnosticsProperty('actions', actions))
      ..add(DiagnosticsProperty('duration', duration));
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is _PlaybackState &&
            (identical(other.song, song) ||
                const DeepCollectionEquality().equals(other.song, song)) &&
            (identical(other.actions, actions) ||
                const DeepCollectionEquality()
                    .equals(other.actions, actions)) &&
            (identical(other.duration, duration) ||
                const DeepCollectionEquality()
                    .equals(other.duration, duration)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^
      const DeepCollectionEquality().hash(song) ^
      const DeepCollectionEquality().hash(actions) ^
      const DeepCollectionEquality().hash(duration);

  @JsonKey(ignore: true)
  @override
  _$PlaybackStateCopyWith<_PlaybackState> get copyWith =>
      __$PlaybackStateCopyWithImpl<_PlaybackState>(this, _$identity);
}

abstract class _PlaybackState implements PlaybackData {
  factory _PlaybackState(
      {required Song song,
      required PlaybackActions actions,
      PlaybackDuration? duration}) = _$_PlaybackState;

  @override
  Song get song => throw _privateConstructorUsedError;
  @override
  PlaybackActions get actions => throw _privateConstructorUsedError;
  @override
  PlaybackDuration? get duration => throw _privateConstructorUsedError;
  @override
  @JsonKey(ignore: true)
  _$PlaybackStateCopyWith<_PlaybackState> get copyWith =>
      throw _privateConstructorUsedError;
}

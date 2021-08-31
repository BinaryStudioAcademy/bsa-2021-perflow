// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides

part of 'playlist_reaction_cubit.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
class _$PlaylistReactionStateTearOff {
  const _$PlaylistReactionStateTearOff();

  PlaylistReactionStateInitial initial() {
    return PlaylistReactionStateInitial();
  }

  PlaylistReactionStateLoading loading() {
    return PlaylistReactionStateLoading();
  }

  PlaylistReactionStateError error(String errorMessage) {
    return PlaylistReactionStateError(
      errorMessage,
    );
  }

  PlaylistReactionStateLiked liked() {
    return PlaylistReactionStateLiked();
  }

  PlaylistReactionStateUnliked unliked() {
    return PlaylistReactionStateUnliked();
  }
}

/// @nodoc
const $PlaylistReactionState = _$PlaylistReactionStateTearOff();

/// @nodoc
mixin _$PlaylistReactionState {
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() initial,
    required TResult Function() loading,
    required TResult Function(String errorMessage) error,
    required TResult Function() liked,
    required TResult Function() unliked,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? initial,
    TResult Function()? loading,
    TResult Function(String errorMessage)? error,
    TResult Function()? liked,
    TResult Function()? unliked,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(PlaylistReactionStateInitial value) initial,
    required TResult Function(PlaylistReactionStateLoading value) loading,
    required TResult Function(PlaylistReactionStateError value) error,
    required TResult Function(PlaylistReactionStateLiked value) liked,
    required TResult Function(PlaylistReactionStateUnliked value) unliked,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(PlaylistReactionStateInitial value)? initial,
    TResult Function(PlaylistReactionStateLoading value)? loading,
    TResult Function(PlaylistReactionStateError value)? error,
    TResult Function(PlaylistReactionStateLiked value)? liked,
    TResult Function(PlaylistReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PlaylistReactionStateCopyWith<$Res> {
  factory $PlaylistReactionStateCopyWith(PlaylistReactionState value,
          $Res Function(PlaylistReactionState) then) =
      _$PlaylistReactionStateCopyWithImpl<$Res>;
}

/// @nodoc
class _$PlaylistReactionStateCopyWithImpl<$Res>
    implements $PlaylistReactionStateCopyWith<$Res> {
  _$PlaylistReactionStateCopyWithImpl(this._value, this._then);

  final PlaylistReactionState _value;
  // ignore: unused_field
  final $Res Function(PlaylistReactionState) _then;
}

/// @nodoc
abstract class $PlaylistReactionStateInitialCopyWith<$Res> {
  factory $PlaylistReactionStateInitialCopyWith(
          PlaylistReactionStateInitial value,
          $Res Function(PlaylistReactionStateInitial) then) =
      _$PlaylistReactionStateInitialCopyWithImpl<$Res>;
}

/// @nodoc
class _$PlaylistReactionStateInitialCopyWithImpl<$Res>
    extends _$PlaylistReactionStateCopyWithImpl<$Res>
    implements $PlaylistReactionStateInitialCopyWith<$Res> {
  _$PlaylistReactionStateInitialCopyWithImpl(
      PlaylistReactionStateInitial _value,
      $Res Function(PlaylistReactionStateInitial) _then)
      : super(_value, (v) => _then(v as PlaylistReactionStateInitial));

  @override
  PlaylistReactionStateInitial get _value =>
      super._value as PlaylistReactionStateInitial;
}

/// @nodoc

class _$PlaylistReactionStateInitial implements PlaylistReactionStateInitial {
  _$PlaylistReactionStateInitial();

  @override
  String toString() {
    return 'PlaylistReactionState.initial()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is PlaylistReactionStateInitial);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() initial,
    required TResult Function() loading,
    required TResult Function(String errorMessage) error,
    required TResult Function() liked,
    required TResult Function() unliked,
  }) {
    return initial();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? initial,
    TResult Function()? loading,
    TResult Function(String errorMessage)? error,
    TResult Function()? liked,
    TResult Function()? unliked,
    required TResult orElse(),
  }) {
    if (initial != null) {
      return initial();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(PlaylistReactionStateInitial value) initial,
    required TResult Function(PlaylistReactionStateLoading value) loading,
    required TResult Function(PlaylistReactionStateError value) error,
    required TResult Function(PlaylistReactionStateLiked value) liked,
    required TResult Function(PlaylistReactionStateUnliked value) unliked,
  }) {
    return initial(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(PlaylistReactionStateInitial value)? initial,
    TResult Function(PlaylistReactionStateLoading value)? loading,
    TResult Function(PlaylistReactionStateError value)? error,
    TResult Function(PlaylistReactionStateLiked value)? liked,
    TResult Function(PlaylistReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (initial != null) {
      return initial(this);
    }
    return orElse();
  }
}

abstract class PlaylistReactionStateInitial implements PlaylistReactionState {
  factory PlaylistReactionStateInitial() = _$PlaylistReactionStateInitial;
}

/// @nodoc
abstract class $PlaylistReactionStateLoadingCopyWith<$Res> {
  factory $PlaylistReactionStateLoadingCopyWith(
          PlaylistReactionStateLoading value,
          $Res Function(PlaylistReactionStateLoading) then) =
      _$PlaylistReactionStateLoadingCopyWithImpl<$Res>;
}

/// @nodoc
class _$PlaylistReactionStateLoadingCopyWithImpl<$Res>
    extends _$PlaylistReactionStateCopyWithImpl<$Res>
    implements $PlaylistReactionStateLoadingCopyWith<$Res> {
  _$PlaylistReactionStateLoadingCopyWithImpl(
      PlaylistReactionStateLoading _value,
      $Res Function(PlaylistReactionStateLoading) _then)
      : super(_value, (v) => _then(v as PlaylistReactionStateLoading));

  @override
  PlaylistReactionStateLoading get _value =>
      super._value as PlaylistReactionStateLoading;
}

/// @nodoc

class _$PlaylistReactionStateLoading implements PlaylistReactionStateLoading {
  _$PlaylistReactionStateLoading();

  @override
  String toString() {
    return 'PlaylistReactionState.loading()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is PlaylistReactionStateLoading);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() initial,
    required TResult Function() loading,
    required TResult Function(String errorMessage) error,
    required TResult Function() liked,
    required TResult Function() unliked,
  }) {
    return loading();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? initial,
    TResult Function()? loading,
    TResult Function(String errorMessage)? error,
    TResult Function()? liked,
    TResult Function()? unliked,
    required TResult orElse(),
  }) {
    if (loading != null) {
      return loading();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(PlaylistReactionStateInitial value) initial,
    required TResult Function(PlaylistReactionStateLoading value) loading,
    required TResult Function(PlaylistReactionStateError value) error,
    required TResult Function(PlaylistReactionStateLiked value) liked,
    required TResult Function(PlaylistReactionStateUnliked value) unliked,
  }) {
    return loading(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(PlaylistReactionStateInitial value)? initial,
    TResult Function(PlaylistReactionStateLoading value)? loading,
    TResult Function(PlaylistReactionStateError value)? error,
    TResult Function(PlaylistReactionStateLiked value)? liked,
    TResult Function(PlaylistReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (loading != null) {
      return loading(this);
    }
    return orElse();
  }
}

abstract class PlaylistReactionStateLoading implements PlaylistReactionState {
  factory PlaylistReactionStateLoading() = _$PlaylistReactionStateLoading;
}

/// @nodoc
abstract class $PlaylistReactionStateErrorCopyWith<$Res> {
  factory $PlaylistReactionStateErrorCopyWith(PlaylistReactionStateError value,
          $Res Function(PlaylistReactionStateError) then) =
      _$PlaylistReactionStateErrorCopyWithImpl<$Res>;
  $Res call({String errorMessage});
}

/// @nodoc
class _$PlaylistReactionStateErrorCopyWithImpl<$Res>
    extends _$PlaylistReactionStateCopyWithImpl<$Res>
    implements $PlaylistReactionStateErrorCopyWith<$Res> {
  _$PlaylistReactionStateErrorCopyWithImpl(PlaylistReactionStateError _value,
      $Res Function(PlaylistReactionStateError) _then)
      : super(_value, (v) => _then(v as PlaylistReactionStateError));

  @override
  PlaylistReactionStateError get _value =>
      super._value as PlaylistReactionStateError;

  @override
  $Res call({
    Object? errorMessage = freezed,
  }) {
    return _then(PlaylistReactionStateError(
      errorMessage == freezed
          ? _value.errorMessage
          : errorMessage // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc

class _$PlaylistReactionStateError implements PlaylistReactionStateError {
  _$PlaylistReactionStateError(this.errorMessage);

  @override
  final String errorMessage;

  @override
  String toString() {
    return 'PlaylistReactionState.error(errorMessage: $errorMessage)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is PlaylistReactionStateError &&
            (identical(other.errorMessage, errorMessage) ||
                const DeepCollectionEquality()
                    .equals(other.errorMessage, errorMessage)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^ const DeepCollectionEquality().hash(errorMessage);

  @JsonKey(ignore: true)
  @override
  $PlaylistReactionStateErrorCopyWith<PlaylistReactionStateError>
      get copyWith =>
          _$PlaylistReactionStateErrorCopyWithImpl<PlaylistReactionStateError>(
              this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() initial,
    required TResult Function() loading,
    required TResult Function(String errorMessage) error,
    required TResult Function() liked,
    required TResult Function() unliked,
  }) {
    return error(errorMessage);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? initial,
    TResult Function()? loading,
    TResult Function(String errorMessage)? error,
    TResult Function()? liked,
    TResult Function()? unliked,
    required TResult orElse(),
  }) {
    if (error != null) {
      return error(errorMessage);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(PlaylistReactionStateInitial value) initial,
    required TResult Function(PlaylistReactionStateLoading value) loading,
    required TResult Function(PlaylistReactionStateError value) error,
    required TResult Function(PlaylistReactionStateLiked value) liked,
    required TResult Function(PlaylistReactionStateUnliked value) unliked,
  }) {
    return error(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(PlaylistReactionStateInitial value)? initial,
    TResult Function(PlaylistReactionStateLoading value)? loading,
    TResult Function(PlaylistReactionStateError value)? error,
    TResult Function(PlaylistReactionStateLiked value)? liked,
    TResult Function(PlaylistReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (error != null) {
      return error(this);
    }
    return orElse();
  }
}

abstract class PlaylistReactionStateError implements PlaylistReactionState {
  factory PlaylistReactionStateError(String errorMessage) =
      _$PlaylistReactionStateError;

  String get errorMessage => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $PlaylistReactionStateErrorCopyWith<PlaylistReactionStateError>
      get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $PlaylistReactionStateLikedCopyWith<$Res> {
  factory $PlaylistReactionStateLikedCopyWith(PlaylistReactionStateLiked value,
          $Res Function(PlaylistReactionStateLiked) then) =
      _$PlaylistReactionStateLikedCopyWithImpl<$Res>;
}

/// @nodoc
class _$PlaylistReactionStateLikedCopyWithImpl<$Res>
    extends _$PlaylistReactionStateCopyWithImpl<$Res>
    implements $PlaylistReactionStateLikedCopyWith<$Res> {
  _$PlaylistReactionStateLikedCopyWithImpl(PlaylistReactionStateLiked _value,
      $Res Function(PlaylistReactionStateLiked) _then)
      : super(_value, (v) => _then(v as PlaylistReactionStateLiked));

  @override
  PlaylistReactionStateLiked get _value =>
      super._value as PlaylistReactionStateLiked;
}

/// @nodoc

class _$PlaylistReactionStateLiked implements PlaylistReactionStateLiked {
  _$PlaylistReactionStateLiked();

  @override
  String toString() {
    return 'PlaylistReactionState.liked()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is PlaylistReactionStateLiked);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() initial,
    required TResult Function() loading,
    required TResult Function(String errorMessage) error,
    required TResult Function() liked,
    required TResult Function() unliked,
  }) {
    return liked();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? initial,
    TResult Function()? loading,
    TResult Function(String errorMessage)? error,
    TResult Function()? liked,
    TResult Function()? unliked,
    required TResult orElse(),
  }) {
    if (liked != null) {
      return liked();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(PlaylistReactionStateInitial value) initial,
    required TResult Function(PlaylistReactionStateLoading value) loading,
    required TResult Function(PlaylistReactionStateError value) error,
    required TResult Function(PlaylistReactionStateLiked value) liked,
    required TResult Function(PlaylistReactionStateUnliked value) unliked,
  }) {
    return liked(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(PlaylistReactionStateInitial value)? initial,
    TResult Function(PlaylistReactionStateLoading value)? loading,
    TResult Function(PlaylistReactionStateError value)? error,
    TResult Function(PlaylistReactionStateLiked value)? liked,
    TResult Function(PlaylistReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (liked != null) {
      return liked(this);
    }
    return orElse();
  }
}

abstract class PlaylistReactionStateLiked implements PlaylistReactionState {
  factory PlaylistReactionStateLiked() = _$PlaylistReactionStateLiked;
}

/// @nodoc
abstract class $PlaylistReactionStateUnlikedCopyWith<$Res> {
  factory $PlaylistReactionStateUnlikedCopyWith(
          PlaylistReactionStateUnliked value,
          $Res Function(PlaylistReactionStateUnliked) then) =
      _$PlaylistReactionStateUnlikedCopyWithImpl<$Res>;
}

/// @nodoc
class _$PlaylistReactionStateUnlikedCopyWithImpl<$Res>
    extends _$PlaylistReactionStateCopyWithImpl<$Res>
    implements $PlaylistReactionStateUnlikedCopyWith<$Res> {
  _$PlaylistReactionStateUnlikedCopyWithImpl(
      PlaylistReactionStateUnliked _value,
      $Res Function(PlaylistReactionStateUnliked) _then)
      : super(_value, (v) => _then(v as PlaylistReactionStateUnliked));

  @override
  PlaylistReactionStateUnliked get _value =>
      super._value as PlaylistReactionStateUnliked;
}

/// @nodoc

class _$PlaylistReactionStateUnliked implements PlaylistReactionStateUnliked {
  _$PlaylistReactionStateUnliked();

  @override
  String toString() {
    return 'PlaylistReactionState.unliked()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is PlaylistReactionStateUnliked);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() initial,
    required TResult Function() loading,
    required TResult Function(String errorMessage) error,
    required TResult Function() liked,
    required TResult Function() unliked,
  }) {
    return unliked();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? initial,
    TResult Function()? loading,
    TResult Function(String errorMessage)? error,
    TResult Function()? liked,
    TResult Function()? unliked,
    required TResult orElse(),
  }) {
    if (unliked != null) {
      return unliked();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(PlaylistReactionStateInitial value) initial,
    required TResult Function(PlaylistReactionStateLoading value) loading,
    required TResult Function(PlaylistReactionStateError value) error,
    required TResult Function(PlaylistReactionStateLiked value) liked,
    required TResult Function(PlaylistReactionStateUnliked value) unliked,
  }) {
    return unliked(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(PlaylistReactionStateInitial value)? initial,
    TResult Function(PlaylistReactionStateLoading value)? loading,
    TResult Function(PlaylistReactionStateError value)? error,
    TResult Function(PlaylistReactionStateLiked value)? liked,
    TResult Function(PlaylistReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (unliked != null) {
      return unliked(this);
    }
    return orElse();
  }
}

abstract class PlaylistReactionStateUnliked implements PlaylistReactionState {
  factory PlaylistReactionStateUnliked() = _$PlaylistReactionStateUnliked;
}

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides

part of 'artist_reaction_cubit.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
class _$ArtistReactionStateTearOff {
  const _$ArtistReactionStateTearOff();

  ArtistReactionStateInitial initial() {
    return ArtistReactionStateInitial();
  }

  ArtistReactionStateLoading loading() {
    return ArtistReactionStateLoading();
  }

  ArtistReactionStateError error(String errorMessage) {
    return ArtistReactionStateError(
      errorMessage,
    );
  }

  ArtistReactionStateLiked liked() {
    return ArtistReactionStateLiked();
  }

  ArtistReactionStateUnliked unliked() {
    return ArtistReactionStateUnliked();
  }
}

/// @nodoc
const $ArtistReactionState = _$ArtistReactionStateTearOff();

/// @nodoc
mixin _$ArtistReactionState {
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
    required TResult Function(ArtistReactionStateInitial value) initial,
    required TResult Function(ArtistReactionStateLoading value) loading,
    required TResult Function(ArtistReactionStateError value) error,
    required TResult Function(ArtistReactionStateLiked value) liked,
    required TResult Function(ArtistReactionStateUnliked value) unliked,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ArtistReactionStateInitial value)? initial,
    TResult Function(ArtistReactionStateLoading value)? loading,
    TResult Function(ArtistReactionStateError value)? error,
    TResult Function(ArtistReactionStateLiked value)? liked,
    TResult Function(ArtistReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ArtistReactionStateCopyWith<$Res> {
  factory $ArtistReactionStateCopyWith(
          ArtistReactionState value, $Res Function(ArtistReactionState) then) =
      _$ArtistReactionStateCopyWithImpl<$Res>;
}

/// @nodoc
class _$ArtistReactionStateCopyWithImpl<$Res>
    implements $ArtistReactionStateCopyWith<$Res> {
  _$ArtistReactionStateCopyWithImpl(this._value, this._then);

  final ArtistReactionState _value;
  // ignore: unused_field
  final $Res Function(ArtistReactionState) _then;
}

/// @nodoc
abstract class $ArtistReactionStateInitialCopyWith<$Res> {
  factory $ArtistReactionStateInitialCopyWith(ArtistReactionStateInitial value,
          $Res Function(ArtistReactionStateInitial) then) =
      _$ArtistReactionStateInitialCopyWithImpl<$Res>;
}

/// @nodoc
class _$ArtistReactionStateInitialCopyWithImpl<$Res>
    extends _$ArtistReactionStateCopyWithImpl<$Res>
    implements $ArtistReactionStateInitialCopyWith<$Res> {
  _$ArtistReactionStateInitialCopyWithImpl(ArtistReactionStateInitial _value,
      $Res Function(ArtistReactionStateInitial) _then)
      : super(_value, (v) => _then(v as ArtistReactionStateInitial));

  @override
  ArtistReactionStateInitial get _value =>
      super._value as ArtistReactionStateInitial;
}

/// @nodoc

class _$ArtistReactionStateInitial implements ArtistReactionStateInitial {
  _$ArtistReactionStateInitial();

  @override
  String toString() {
    return 'ArtistReactionState.initial()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is ArtistReactionStateInitial);
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
    required TResult Function(ArtistReactionStateInitial value) initial,
    required TResult Function(ArtistReactionStateLoading value) loading,
    required TResult Function(ArtistReactionStateError value) error,
    required TResult Function(ArtistReactionStateLiked value) liked,
    required TResult Function(ArtistReactionStateUnliked value) unliked,
  }) {
    return initial(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ArtistReactionStateInitial value)? initial,
    TResult Function(ArtistReactionStateLoading value)? loading,
    TResult Function(ArtistReactionStateError value)? error,
    TResult Function(ArtistReactionStateLiked value)? liked,
    TResult Function(ArtistReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (initial != null) {
      return initial(this);
    }
    return orElse();
  }
}

abstract class ArtistReactionStateInitial implements ArtistReactionState {
  factory ArtistReactionStateInitial() = _$ArtistReactionStateInitial;
}

/// @nodoc
abstract class $ArtistReactionStateLoadingCopyWith<$Res> {
  factory $ArtistReactionStateLoadingCopyWith(ArtistReactionStateLoading value,
          $Res Function(ArtistReactionStateLoading) then) =
      _$ArtistReactionStateLoadingCopyWithImpl<$Res>;
}

/// @nodoc
class _$ArtistReactionStateLoadingCopyWithImpl<$Res>
    extends _$ArtistReactionStateCopyWithImpl<$Res>
    implements $ArtistReactionStateLoadingCopyWith<$Res> {
  _$ArtistReactionStateLoadingCopyWithImpl(ArtistReactionStateLoading _value,
      $Res Function(ArtistReactionStateLoading) _then)
      : super(_value, (v) => _then(v as ArtistReactionStateLoading));

  @override
  ArtistReactionStateLoading get _value =>
      super._value as ArtistReactionStateLoading;
}

/// @nodoc

class _$ArtistReactionStateLoading implements ArtistReactionStateLoading {
  _$ArtistReactionStateLoading();

  @override
  String toString() {
    return 'ArtistReactionState.loading()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is ArtistReactionStateLoading);
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
    required TResult Function(ArtistReactionStateInitial value) initial,
    required TResult Function(ArtistReactionStateLoading value) loading,
    required TResult Function(ArtistReactionStateError value) error,
    required TResult Function(ArtistReactionStateLiked value) liked,
    required TResult Function(ArtistReactionStateUnliked value) unliked,
  }) {
    return loading(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ArtistReactionStateInitial value)? initial,
    TResult Function(ArtistReactionStateLoading value)? loading,
    TResult Function(ArtistReactionStateError value)? error,
    TResult Function(ArtistReactionStateLiked value)? liked,
    TResult Function(ArtistReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (loading != null) {
      return loading(this);
    }
    return orElse();
  }
}

abstract class ArtistReactionStateLoading implements ArtistReactionState {
  factory ArtistReactionStateLoading() = _$ArtistReactionStateLoading;
}

/// @nodoc
abstract class $ArtistReactionStateErrorCopyWith<$Res> {
  factory $ArtistReactionStateErrorCopyWith(ArtistReactionStateError value,
          $Res Function(ArtistReactionStateError) then) =
      _$ArtistReactionStateErrorCopyWithImpl<$Res>;
  $Res call({String errorMessage});
}

/// @nodoc
class _$ArtistReactionStateErrorCopyWithImpl<$Res>
    extends _$ArtistReactionStateCopyWithImpl<$Res>
    implements $ArtistReactionStateErrorCopyWith<$Res> {
  _$ArtistReactionStateErrorCopyWithImpl(ArtistReactionStateError _value,
      $Res Function(ArtistReactionStateError) _then)
      : super(_value, (v) => _then(v as ArtistReactionStateError));

  @override
  ArtistReactionStateError get _value =>
      super._value as ArtistReactionStateError;

  @override
  $Res call({
    Object? errorMessage = freezed,
  }) {
    return _then(ArtistReactionStateError(
      errorMessage == freezed
          ? _value.errorMessage
          : errorMessage // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc

class _$ArtistReactionStateError implements ArtistReactionStateError {
  _$ArtistReactionStateError(this.errorMessage);

  @override
  final String errorMessage;

  @override
  String toString() {
    return 'ArtistReactionState.error(errorMessage: $errorMessage)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is ArtistReactionStateError &&
            (identical(other.errorMessage, errorMessage) ||
                const DeepCollectionEquality()
                    .equals(other.errorMessage, errorMessage)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^ const DeepCollectionEquality().hash(errorMessage);

  @JsonKey(ignore: true)
  @override
  $ArtistReactionStateErrorCopyWith<ArtistReactionStateError> get copyWith =>
      _$ArtistReactionStateErrorCopyWithImpl<ArtistReactionStateError>(
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
    required TResult Function(ArtistReactionStateInitial value) initial,
    required TResult Function(ArtistReactionStateLoading value) loading,
    required TResult Function(ArtistReactionStateError value) error,
    required TResult Function(ArtistReactionStateLiked value) liked,
    required TResult Function(ArtistReactionStateUnliked value) unliked,
  }) {
    return error(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ArtistReactionStateInitial value)? initial,
    TResult Function(ArtistReactionStateLoading value)? loading,
    TResult Function(ArtistReactionStateError value)? error,
    TResult Function(ArtistReactionStateLiked value)? liked,
    TResult Function(ArtistReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (error != null) {
      return error(this);
    }
    return orElse();
  }
}

abstract class ArtistReactionStateError implements ArtistReactionState {
  factory ArtistReactionStateError(String errorMessage) =
      _$ArtistReactionStateError;

  String get errorMessage => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ArtistReactionStateErrorCopyWith<ArtistReactionStateError> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ArtistReactionStateLikedCopyWith<$Res> {
  factory $ArtistReactionStateLikedCopyWith(ArtistReactionStateLiked value,
          $Res Function(ArtistReactionStateLiked) then) =
      _$ArtistReactionStateLikedCopyWithImpl<$Res>;
}

/// @nodoc
class _$ArtistReactionStateLikedCopyWithImpl<$Res>
    extends _$ArtistReactionStateCopyWithImpl<$Res>
    implements $ArtistReactionStateLikedCopyWith<$Res> {
  _$ArtistReactionStateLikedCopyWithImpl(ArtistReactionStateLiked _value,
      $Res Function(ArtistReactionStateLiked) _then)
      : super(_value, (v) => _then(v as ArtistReactionStateLiked));

  @override
  ArtistReactionStateLiked get _value =>
      super._value as ArtistReactionStateLiked;
}

/// @nodoc

class _$ArtistReactionStateLiked implements ArtistReactionStateLiked {
  _$ArtistReactionStateLiked();

  @override
  String toString() {
    return 'ArtistReactionState.liked()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is ArtistReactionStateLiked);
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
    required TResult Function(ArtistReactionStateInitial value) initial,
    required TResult Function(ArtistReactionStateLoading value) loading,
    required TResult Function(ArtistReactionStateError value) error,
    required TResult Function(ArtistReactionStateLiked value) liked,
    required TResult Function(ArtistReactionStateUnliked value) unliked,
  }) {
    return liked(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ArtistReactionStateInitial value)? initial,
    TResult Function(ArtistReactionStateLoading value)? loading,
    TResult Function(ArtistReactionStateError value)? error,
    TResult Function(ArtistReactionStateLiked value)? liked,
    TResult Function(ArtistReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (liked != null) {
      return liked(this);
    }
    return orElse();
  }
}

abstract class ArtistReactionStateLiked implements ArtistReactionState {
  factory ArtistReactionStateLiked() = _$ArtistReactionStateLiked;
}

/// @nodoc
abstract class $ArtistReactionStateUnlikedCopyWith<$Res> {
  factory $ArtistReactionStateUnlikedCopyWith(ArtistReactionStateUnliked value,
          $Res Function(ArtistReactionStateUnliked) then) =
      _$ArtistReactionStateUnlikedCopyWithImpl<$Res>;
}

/// @nodoc
class _$ArtistReactionStateUnlikedCopyWithImpl<$Res>
    extends _$ArtistReactionStateCopyWithImpl<$Res>
    implements $ArtistReactionStateUnlikedCopyWith<$Res> {
  _$ArtistReactionStateUnlikedCopyWithImpl(ArtistReactionStateUnliked _value,
      $Res Function(ArtistReactionStateUnliked) _then)
      : super(_value, (v) => _then(v as ArtistReactionStateUnliked));

  @override
  ArtistReactionStateUnliked get _value =>
      super._value as ArtistReactionStateUnliked;
}

/// @nodoc

class _$ArtistReactionStateUnliked implements ArtistReactionStateUnliked {
  _$ArtistReactionStateUnliked();

  @override
  String toString() {
    return 'ArtistReactionState.unliked()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is ArtistReactionStateUnliked);
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
    required TResult Function(ArtistReactionStateInitial value) initial,
    required TResult Function(ArtistReactionStateLoading value) loading,
    required TResult Function(ArtistReactionStateError value) error,
    required TResult Function(ArtistReactionStateLiked value) liked,
    required TResult Function(ArtistReactionStateUnliked value) unliked,
  }) {
    return unliked(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ArtistReactionStateInitial value)? initial,
    TResult Function(ArtistReactionStateLoading value)? loading,
    TResult Function(ArtistReactionStateError value)? error,
    TResult Function(ArtistReactionStateLiked value)? liked,
    TResult Function(ArtistReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (unliked != null) {
      return unliked(this);
    }
    return orElse();
  }
}

abstract class ArtistReactionStateUnliked implements ArtistReactionState {
  factory ArtistReactionStateUnliked() = _$ArtistReactionStateUnliked;
}

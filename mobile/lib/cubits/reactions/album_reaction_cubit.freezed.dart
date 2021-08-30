// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides

part of 'album_reaction_cubit.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
class _$AlbumReactionStateTearOff {
  const _$AlbumReactionStateTearOff();

  AlbumReactionStateInitial initial() {
    return AlbumReactionStateInitial();
  }

  AlbumReactionStateLoading loading() {
    return AlbumReactionStateLoading();
  }

  AlbumReactionStateError error(String errorMessage) {
    return AlbumReactionStateError(
      errorMessage,
    );
  }

  AlbumReactionStateLiked liked() {
    return AlbumReactionStateLiked();
  }

  AlbumReactionStateUnliked unliked() {
    return AlbumReactionStateUnliked();
  }
}

/// @nodoc
const $AlbumReactionState = _$AlbumReactionStateTearOff();

/// @nodoc
mixin _$AlbumReactionState {
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
    required TResult Function(AlbumReactionStateInitial value) initial,
    required TResult Function(AlbumReactionStateLoading value) loading,
    required TResult Function(AlbumReactionStateError value) error,
    required TResult Function(AlbumReactionStateLiked value) liked,
    required TResult Function(AlbumReactionStateUnliked value) unliked,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(AlbumReactionStateInitial value)? initial,
    TResult Function(AlbumReactionStateLoading value)? loading,
    TResult Function(AlbumReactionStateError value)? error,
    TResult Function(AlbumReactionStateLiked value)? liked,
    TResult Function(AlbumReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $AlbumReactionStateCopyWith<$Res> {
  factory $AlbumReactionStateCopyWith(
          AlbumReactionState value, $Res Function(AlbumReactionState) then) =
      _$AlbumReactionStateCopyWithImpl<$Res>;
}

/// @nodoc
class _$AlbumReactionStateCopyWithImpl<$Res>
    implements $AlbumReactionStateCopyWith<$Res> {
  _$AlbumReactionStateCopyWithImpl(this._value, this._then);

  final AlbumReactionState _value;
  // ignore: unused_field
  final $Res Function(AlbumReactionState) _then;
}

/// @nodoc
abstract class $AlbumReactionStateInitialCopyWith<$Res> {
  factory $AlbumReactionStateInitialCopyWith(AlbumReactionStateInitial value,
          $Res Function(AlbumReactionStateInitial) then) =
      _$AlbumReactionStateInitialCopyWithImpl<$Res>;
}

/// @nodoc
class _$AlbumReactionStateInitialCopyWithImpl<$Res>
    extends _$AlbumReactionStateCopyWithImpl<$Res>
    implements $AlbumReactionStateInitialCopyWith<$Res> {
  _$AlbumReactionStateInitialCopyWithImpl(AlbumReactionStateInitial _value,
      $Res Function(AlbumReactionStateInitial) _then)
      : super(_value, (v) => _then(v as AlbumReactionStateInitial));

  @override
  AlbumReactionStateInitial get _value =>
      super._value as AlbumReactionStateInitial;
}

/// @nodoc

class _$AlbumReactionStateInitial implements AlbumReactionStateInitial {
  _$AlbumReactionStateInitial();

  @override
  String toString() {
    return 'AlbumReactionState.initial()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is AlbumReactionStateInitial);
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
    required TResult Function(AlbumReactionStateInitial value) initial,
    required TResult Function(AlbumReactionStateLoading value) loading,
    required TResult Function(AlbumReactionStateError value) error,
    required TResult Function(AlbumReactionStateLiked value) liked,
    required TResult Function(AlbumReactionStateUnliked value) unliked,
  }) {
    return initial(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(AlbumReactionStateInitial value)? initial,
    TResult Function(AlbumReactionStateLoading value)? loading,
    TResult Function(AlbumReactionStateError value)? error,
    TResult Function(AlbumReactionStateLiked value)? liked,
    TResult Function(AlbumReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (initial != null) {
      return initial(this);
    }
    return orElse();
  }
}

abstract class AlbumReactionStateInitial implements AlbumReactionState {
  factory AlbumReactionStateInitial() = _$AlbumReactionStateInitial;
}

/// @nodoc
abstract class $AlbumReactionStateLoadingCopyWith<$Res> {
  factory $AlbumReactionStateLoadingCopyWith(AlbumReactionStateLoading value,
          $Res Function(AlbumReactionStateLoading) then) =
      _$AlbumReactionStateLoadingCopyWithImpl<$Res>;
}

/// @nodoc
class _$AlbumReactionStateLoadingCopyWithImpl<$Res>
    extends _$AlbumReactionStateCopyWithImpl<$Res>
    implements $AlbumReactionStateLoadingCopyWith<$Res> {
  _$AlbumReactionStateLoadingCopyWithImpl(AlbumReactionStateLoading _value,
      $Res Function(AlbumReactionStateLoading) _then)
      : super(_value, (v) => _then(v as AlbumReactionStateLoading));

  @override
  AlbumReactionStateLoading get _value =>
      super._value as AlbumReactionStateLoading;
}

/// @nodoc

class _$AlbumReactionStateLoading implements AlbumReactionStateLoading {
  _$AlbumReactionStateLoading();

  @override
  String toString() {
    return 'AlbumReactionState.loading()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is AlbumReactionStateLoading);
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
    required TResult Function(AlbumReactionStateInitial value) initial,
    required TResult Function(AlbumReactionStateLoading value) loading,
    required TResult Function(AlbumReactionStateError value) error,
    required TResult Function(AlbumReactionStateLiked value) liked,
    required TResult Function(AlbumReactionStateUnliked value) unliked,
  }) {
    return loading(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(AlbumReactionStateInitial value)? initial,
    TResult Function(AlbumReactionStateLoading value)? loading,
    TResult Function(AlbumReactionStateError value)? error,
    TResult Function(AlbumReactionStateLiked value)? liked,
    TResult Function(AlbumReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (loading != null) {
      return loading(this);
    }
    return orElse();
  }
}

abstract class AlbumReactionStateLoading implements AlbumReactionState {
  factory AlbumReactionStateLoading() = _$AlbumReactionStateLoading;
}

/// @nodoc
abstract class $AlbumReactionStateErrorCopyWith<$Res> {
  factory $AlbumReactionStateErrorCopyWith(AlbumReactionStateError value,
          $Res Function(AlbumReactionStateError) then) =
      _$AlbumReactionStateErrorCopyWithImpl<$Res>;
  $Res call({String errorMessage});
}

/// @nodoc
class _$AlbumReactionStateErrorCopyWithImpl<$Res>
    extends _$AlbumReactionStateCopyWithImpl<$Res>
    implements $AlbumReactionStateErrorCopyWith<$Res> {
  _$AlbumReactionStateErrorCopyWithImpl(AlbumReactionStateError _value,
      $Res Function(AlbumReactionStateError) _then)
      : super(_value, (v) => _then(v as AlbumReactionStateError));

  @override
  AlbumReactionStateError get _value => super._value as AlbumReactionStateError;

  @override
  $Res call({
    Object? errorMessage = freezed,
  }) {
    return _then(AlbumReactionStateError(
      errorMessage == freezed
          ? _value.errorMessage
          : errorMessage // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc

class _$AlbumReactionStateError implements AlbumReactionStateError {
  _$AlbumReactionStateError(this.errorMessage);

  @override
  final String errorMessage;

  @override
  String toString() {
    return 'AlbumReactionState.error(errorMessage: $errorMessage)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is AlbumReactionStateError &&
            (identical(other.errorMessage, errorMessage) ||
                const DeepCollectionEquality()
                    .equals(other.errorMessage, errorMessage)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^ const DeepCollectionEquality().hash(errorMessage);

  @JsonKey(ignore: true)
  @override
  $AlbumReactionStateErrorCopyWith<AlbumReactionStateError> get copyWith =>
      _$AlbumReactionStateErrorCopyWithImpl<AlbumReactionStateError>(
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
    required TResult Function(AlbumReactionStateInitial value) initial,
    required TResult Function(AlbumReactionStateLoading value) loading,
    required TResult Function(AlbumReactionStateError value) error,
    required TResult Function(AlbumReactionStateLiked value) liked,
    required TResult Function(AlbumReactionStateUnliked value) unliked,
  }) {
    return error(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(AlbumReactionStateInitial value)? initial,
    TResult Function(AlbumReactionStateLoading value)? loading,
    TResult Function(AlbumReactionStateError value)? error,
    TResult Function(AlbumReactionStateLiked value)? liked,
    TResult Function(AlbumReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (error != null) {
      return error(this);
    }
    return orElse();
  }
}

abstract class AlbumReactionStateError implements AlbumReactionState {
  factory AlbumReactionStateError(String errorMessage) =
      _$AlbumReactionStateError;

  String get errorMessage => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $AlbumReactionStateErrorCopyWith<AlbumReactionStateError> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $AlbumReactionStateLikedCopyWith<$Res> {
  factory $AlbumReactionStateLikedCopyWith(AlbumReactionStateLiked value,
          $Res Function(AlbumReactionStateLiked) then) =
      _$AlbumReactionStateLikedCopyWithImpl<$Res>;
}

/// @nodoc
class _$AlbumReactionStateLikedCopyWithImpl<$Res>
    extends _$AlbumReactionStateCopyWithImpl<$Res>
    implements $AlbumReactionStateLikedCopyWith<$Res> {
  _$AlbumReactionStateLikedCopyWithImpl(AlbumReactionStateLiked _value,
      $Res Function(AlbumReactionStateLiked) _then)
      : super(_value, (v) => _then(v as AlbumReactionStateLiked));

  @override
  AlbumReactionStateLiked get _value => super._value as AlbumReactionStateLiked;
}

/// @nodoc

class _$AlbumReactionStateLiked implements AlbumReactionStateLiked {
  _$AlbumReactionStateLiked();

  @override
  String toString() {
    return 'AlbumReactionState.liked()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is AlbumReactionStateLiked);
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
    required TResult Function(AlbumReactionStateInitial value) initial,
    required TResult Function(AlbumReactionStateLoading value) loading,
    required TResult Function(AlbumReactionStateError value) error,
    required TResult Function(AlbumReactionStateLiked value) liked,
    required TResult Function(AlbumReactionStateUnliked value) unliked,
  }) {
    return liked(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(AlbumReactionStateInitial value)? initial,
    TResult Function(AlbumReactionStateLoading value)? loading,
    TResult Function(AlbumReactionStateError value)? error,
    TResult Function(AlbumReactionStateLiked value)? liked,
    TResult Function(AlbumReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (liked != null) {
      return liked(this);
    }
    return orElse();
  }
}

abstract class AlbumReactionStateLiked implements AlbumReactionState {
  factory AlbumReactionStateLiked() = _$AlbumReactionStateLiked;
}

/// @nodoc
abstract class $AlbumReactionStateUnlikedCopyWith<$Res> {
  factory $AlbumReactionStateUnlikedCopyWith(AlbumReactionStateUnliked value,
          $Res Function(AlbumReactionStateUnliked) then) =
      _$AlbumReactionStateUnlikedCopyWithImpl<$Res>;
}

/// @nodoc
class _$AlbumReactionStateUnlikedCopyWithImpl<$Res>
    extends _$AlbumReactionStateCopyWithImpl<$Res>
    implements $AlbumReactionStateUnlikedCopyWith<$Res> {
  _$AlbumReactionStateUnlikedCopyWithImpl(AlbumReactionStateUnliked _value,
      $Res Function(AlbumReactionStateUnliked) _then)
      : super(_value, (v) => _then(v as AlbumReactionStateUnliked));

  @override
  AlbumReactionStateUnliked get _value =>
      super._value as AlbumReactionStateUnliked;
}

/// @nodoc

class _$AlbumReactionStateUnliked implements AlbumReactionStateUnliked {
  _$AlbumReactionStateUnliked();

  @override
  String toString() {
    return 'AlbumReactionState.unliked()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is AlbumReactionStateUnliked);
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
    required TResult Function(AlbumReactionStateInitial value) initial,
    required TResult Function(AlbumReactionStateLoading value) loading,
    required TResult Function(AlbumReactionStateError value) error,
    required TResult Function(AlbumReactionStateLiked value) liked,
    required TResult Function(AlbumReactionStateUnliked value) unliked,
  }) {
    return unliked(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(AlbumReactionStateInitial value)? initial,
    TResult Function(AlbumReactionStateLoading value)? loading,
    TResult Function(AlbumReactionStateError value)? error,
    TResult Function(AlbumReactionStateLiked value)? liked,
    TResult Function(AlbumReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (unliked != null) {
      return unliked(this);
    }
    return orElse();
  }
}

abstract class AlbumReactionStateUnliked implements AlbumReactionState {
  factory AlbumReactionStateUnliked() = _$AlbumReactionStateUnliked;
}

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides

part of 'song_reaction_cubit.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
class _$SongReactionStateTearOff {
  const _$SongReactionStateTearOff();

  SongReactionStateInitial initial() {
    return SongReactionStateInitial();
  }

  SongReactionStateLoading loading() {
    return SongReactionStateLoading();
  }

  SongReactionStateError error(String errorMessage) {
    return SongReactionStateError(
      errorMessage,
    );
  }

  SongReactionStateLiked liked() {
    return SongReactionStateLiked();
  }

  SongReactionStateUnliked unliked() {
    return SongReactionStateUnliked();
  }
}

/// @nodoc
const $SongReactionState = _$SongReactionStateTearOff();

/// @nodoc
mixin _$SongReactionState {
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
    required TResult Function(SongReactionStateInitial value) initial,
    required TResult Function(SongReactionStateLoading value) loading,
    required TResult Function(SongReactionStateError value) error,
    required TResult Function(SongReactionStateLiked value) liked,
    required TResult Function(SongReactionStateUnliked value) unliked,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(SongReactionStateInitial value)? initial,
    TResult Function(SongReactionStateLoading value)? loading,
    TResult Function(SongReactionStateError value)? error,
    TResult Function(SongReactionStateLiked value)? liked,
    TResult Function(SongReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SongReactionStateCopyWith<$Res> {
  factory $SongReactionStateCopyWith(
          SongReactionState value, $Res Function(SongReactionState) then) =
      _$SongReactionStateCopyWithImpl<$Res>;
}

/// @nodoc
class _$SongReactionStateCopyWithImpl<$Res>
    implements $SongReactionStateCopyWith<$Res> {
  _$SongReactionStateCopyWithImpl(this._value, this._then);

  final SongReactionState _value;
  // ignore: unused_field
  final $Res Function(SongReactionState) _then;
}

/// @nodoc
abstract class $SongReactionStateInitialCopyWith<$Res> {
  factory $SongReactionStateInitialCopyWith(SongReactionStateInitial value,
          $Res Function(SongReactionStateInitial) then) =
      _$SongReactionStateInitialCopyWithImpl<$Res>;
}

/// @nodoc
class _$SongReactionStateInitialCopyWithImpl<$Res>
    extends _$SongReactionStateCopyWithImpl<$Res>
    implements $SongReactionStateInitialCopyWith<$Res> {
  _$SongReactionStateInitialCopyWithImpl(SongReactionStateInitial _value,
      $Res Function(SongReactionStateInitial) _then)
      : super(_value, (v) => _then(v as SongReactionStateInitial));

  @override
  SongReactionStateInitial get _value =>
      super._value as SongReactionStateInitial;
}

/// @nodoc

class _$SongReactionStateInitial implements SongReactionStateInitial {
  _$SongReactionStateInitial();

  @override
  String toString() {
    return 'SongReactionState.initial()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is SongReactionStateInitial);
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
    required TResult Function(SongReactionStateInitial value) initial,
    required TResult Function(SongReactionStateLoading value) loading,
    required TResult Function(SongReactionStateError value) error,
    required TResult Function(SongReactionStateLiked value) liked,
    required TResult Function(SongReactionStateUnliked value) unliked,
  }) {
    return initial(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(SongReactionStateInitial value)? initial,
    TResult Function(SongReactionStateLoading value)? loading,
    TResult Function(SongReactionStateError value)? error,
    TResult Function(SongReactionStateLiked value)? liked,
    TResult Function(SongReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (initial != null) {
      return initial(this);
    }
    return orElse();
  }
}

abstract class SongReactionStateInitial implements SongReactionState {
  factory SongReactionStateInitial() = _$SongReactionStateInitial;
}

/// @nodoc
abstract class $SongReactionStateLoadingCopyWith<$Res> {
  factory $SongReactionStateLoadingCopyWith(SongReactionStateLoading value,
          $Res Function(SongReactionStateLoading) then) =
      _$SongReactionStateLoadingCopyWithImpl<$Res>;
}

/// @nodoc
class _$SongReactionStateLoadingCopyWithImpl<$Res>
    extends _$SongReactionStateCopyWithImpl<$Res>
    implements $SongReactionStateLoadingCopyWith<$Res> {
  _$SongReactionStateLoadingCopyWithImpl(SongReactionStateLoading _value,
      $Res Function(SongReactionStateLoading) _then)
      : super(_value, (v) => _then(v as SongReactionStateLoading));

  @override
  SongReactionStateLoading get _value =>
      super._value as SongReactionStateLoading;
}

/// @nodoc

class _$SongReactionStateLoading implements SongReactionStateLoading {
  _$SongReactionStateLoading();

  @override
  String toString() {
    return 'SongReactionState.loading()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is SongReactionStateLoading);
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
    required TResult Function(SongReactionStateInitial value) initial,
    required TResult Function(SongReactionStateLoading value) loading,
    required TResult Function(SongReactionStateError value) error,
    required TResult Function(SongReactionStateLiked value) liked,
    required TResult Function(SongReactionStateUnliked value) unliked,
  }) {
    return loading(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(SongReactionStateInitial value)? initial,
    TResult Function(SongReactionStateLoading value)? loading,
    TResult Function(SongReactionStateError value)? error,
    TResult Function(SongReactionStateLiked value)? liked,
    TResult Function(SongReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (loading != null) {
      return loading(this);
    }
    return orElse();
  }
}

abstract class SongReactionStateLoading implements SongReactionState {
  factory SongReactionStateLoading() = _$SongReactionStateLoading;
}

/// @nodoc
abstract class $SongReactionStateErrorCopyWith<$Res> {
  factory $SongReactionStateErrorCopyWith(SongReactionStateError value,
          $Res Function(SongReactionStateError) then) =
      _$SongReactionStateErrorCopyWithImpl<$Res>;
  $Res call({String errorMessage});
}

/// @nodoc
class _$SongReactionStateErrorCopyWithImpl<$Res>
    extends _$SongReactionStateCopyWithImpl<$Res>
    implements $SongReactionStateErrorCopyWith<$Res> {
  _$SongReactionStateErrorCopyWithImpl(SongReactionStateError _value,
      $Res Function(SongReactionStateError) _then)
      : super(_value, (v) => _then(v as SongReactionStateError));

  @override
  SongReactionStateError get _value => super._value as SongReactionStateError;

  @override
  $Res call({
    Object? errorMessage = freezed,
  }) {
    return _then(SongReactionStateError(
      errorMessage == freezed
          ? _value.errorMessage
          : errorMessage // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc

class _$SongReactionStateError implements SongReactionStateError {
  _$SongReactionStateError(this.errorMessage);

  @override
  final String errorMessage;

  @override
  String toString() {
    return 'SongReactionState.error(errorMessage: $errorMessage)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is SongReactionStateError &&
            (identical(other.errorMessage, errorMessage) ||
                const DeepCollectionEquality()
                    .equals(other.errorMessage, errorMessage)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^ const DeepCollectionEquality().hash(errorMessage);

  @JsonKey(ignore: true)
  @override
  $SongReactionStateErrorCopyWith<SongReactionStateError> get copyWith =>
      _$SongReactionStateErrorCopyWithImpl<SongReactionStateError>(
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
    required TResult Function(SongReactionStateInitial value) initial,
    required TResult Function(SongReactionStateLoading value) loading,
    required TResult Function(SongReactionStateError value) error,
    required TResult Function(SongReactionStateLiked value) liked,
    required TResult Function(SongReactionStateUnliked value) unliked,
  }) {
    return error(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(SongReactionStateInitial value)? initial,
    TResult Function(SongReactionStateLoading value)? loading,
    TResult Function(SongReactionStateError value)? error,
    TResult Function(SongReactionStateLiked value)? liked,
    TResult Function(SongReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (error != null) {
      return error(this);
    }
    return orElse();
  }
}

abstract class SongReactionStateError implements SongReactionState {
  factory SongReactionStateError(String errorMessage) =
      _$SongReactionStateError;

  String get errorMessage => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $SongReactionStateErrorCopyWith<SongReactionStateError> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SongReactionStateLikedCopyWith<$Res> {
  factory $SongReactionStateLikedCopyWith(SongReactionStateLiked value,
          $Res Function(SongReactionStateLiked) then) =
      _$SongReactionStateLikedCopyWithImpl<$Res>;
}

/// @nodoc
class _$SongReactionStateLikedCopyWithImpl<$Res>
    extends _$SongReactionStateCopyWithImpl<$Res>
    implements $SongReactionStateLikedCopyWith<$Res> {
  _$SongReactionStateLikedCopyWithImpl(SongReactionStateLiked _value,
      $Res Function(SongReactionStateLiked) _then)
      : super(_value, (v) => _then(v as SongReactionStateLiked));

  @override
  SongReactionStateLiked get _value => super._value as SongReactionStateLiked;
}

/// @nodoc

class _$SongReactionStateLiked implements SongReactionStateLiked {
  _$SongReactionStateLiked();

  @override
  String toString() {
    return 'SongReactionState.liked()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is SongReactionStateLiked);
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
    required TResult Function(SongReactionStateInitial value) initial,
    required TResult Function(SongReactionStateLoading value) loading,
    required TResult Function(SongReactionStateError value) error,
    required TResult Function(SongReactionStateLiked value) liked,
    required TResult Function(SongReactionStateUnliked value) unliked,
  }) {
    return liked(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(SongReactionStateInitial value)? initial,
    TResult Function(SongReactionStateLoading value)? loading,
    TResult Function(SongReactionStateError value)? error,
    TResult Function(SongReactionStateLiked value)? liked,
    TResult Function(SongReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (liked != null) {
      return liked(this);
    }
    return orElse();
  }
}

abstract class SongReactionStateLiked implements SongReactionState {
  factory SongReactionStateLiked() = _$SongReactionStateLiked;
}

/// @nodoc
abstract class $SongReactionStateUnlikedCopyWith<$Res> {
  factory $SongReactionStateUnlikedCopyWith(SongReactionStateUnliked value,
          $Res Function(SongReactionStateUnliked) then) =
      _$SongReactionStateUnlikedCopyWithImpl<$Res>;
}

/// @nodoc
class _$SongReactionStateUnlikedCopyWithImpl<$Res>
    extends _$SongReactionStateCopyWithImpl<$Res>
    implements $SongReactionStateUnlikedCopyWith<$Res> {
  _$SongReactionStateUnlikedCopyWithImpl(SongReactionStateUnliked _value,
      $Res Function(SongReactionStateUnliked) _then)
      : super(_value, (v) => _then(v as SongReactionStateUnliked));

  @override
  SongReactionStateUnliked get _value =>
      super._value as SongReactionStateUnliked;
}

/// @nodoc

class _$SongReactionStateUnliked implements SongReactionStateUnliked {
  _$SongReactionStateUnliked();

  @override
  String toString() {
    return 'SongReactionState.unliked()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is SongReactionStateUnliked);
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
    required TResult Function(SongReactionStateInitial value) initial,
    required TResult Function(SongReactionStateLoading value) loading,
    required TResult Function(SongReactionStateError value) error,
    required TResult Function(SongReactionStateLiked value) liked,
    required TResult Function(SongReactionStateUnliked value) unliked,
  }) {
    return unliked(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(SongReactionStateInitial value)? initial,
    TResult Function(SongReactionStateLoading value)? loading,
    TResult Function(SongReactionStateError value)? error,
    TResult Function(SongReactionStateLiked value)? liked,
    TResult Function(SongReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (unliked != null) {
      return unliked(this);
    }
    return orElse();
  }
}

abstract class SongReactionStateUnliked implements SongReactionState {
  factory SongReactionStateUnliked() = _$SongReactionStateUnliked;
}

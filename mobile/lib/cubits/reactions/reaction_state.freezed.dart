// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides

part of 'reaction_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
class _$ReactionStateTearOff {
  const _$ReactionStateTearOff();

  ReactionStateLoading loading() {
    return ReactionStateLoading();
  }

  ReactionStateError error(String errorMessage) {
    return ReactionStateError(
      errorMessage,
    );
  }

  ReactionStateLiked liked() {
    return ReactionStateLiked();
  }

  ReactionStateUnliked unliked() {
    return ReactionStateUnliked();
  }
}

/// @nodoc
const $ReactionState = _$ReactionStateTearOff();

/// @nodoc
mixin _$ReactionState {
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() loading,
    required TResult Function(String errorMessage) error,
    required TResult Function() liked,
    required TResult Function() unliked,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? loading,
    TResult Function(String errorMessage)? error,
    TResult Function()? liked,
    TResult Function()? unliked,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(ReactionStateLoading value) loading,
    required TResult Function(ReactionStateError value) error,
    required TResult Function(ReactionStateLiked value) liked,
    required TResult Function(ReactionStateUnliked value) unliked,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ReactionStateLoading value)? loading,
    TResult Function(ReactionStateError value)? error,
    TResult Function(ReactionStateLiked value)? liked,
    TResult Function(ReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ReactionStateCopyWith<$Res> {
  factory $ReactionStateCopyWith(
          ReactionState value, $Res Function(ReactionState) then) =
      _$ReactionStateCopyWithImpl<$Res>;
}

/// @nodoc
class _$ReactionStateCopyWithImpl<$Res>
    implements $ReactionStateCopyWith<$Res> {
  _$ReactionStateCopyWithImpl(this._value, this._then);

  final ReactionState _value;
  // ignore: unused_field
  final $Res Function(ReactionState) _then;
}

/// @nodoc
abstract class $ReactionStateLoadingCopyWith<$Res> {
  factory $ReactionStateLoadingCopyWith(ReactionStateLoading value,
          $Res Function(ReactionStateLoading) then) =
      _$ReactionStateLoadingCopyWithImpl<$Res>;
}

/// @nodoc
class _$ReactionStateLoadingCopyWithImpl<$Res>
    extends _$ReactionStateCopyWithImpl<$Res>
    implements $ReactionStateLoadingCopyWith<$Res> {
  _$ReactionStateLoadingCopyWithImpl(
      ReactionStateLoading _value, $Res Function(ReactionStateLoading) _then)
      : super(_value, (v) => _then(v as ReactionStateLoading));

  @override
  ReactionStateLoading get _value => super._value as ReactionStateLoading;
}

/// @nodoc

class _$ReactionStateLoading implements ReactionStateLoading {
  _$ReactionStateLoading();

  @override
  String toString() {
    return 'ReactionState.loading()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is ReactionStateLoading);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
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
    required TResult Function(ReactionStateLoading value) loading,
    required TResult Function(ReactionStateError value) error,
    required TResult Function(ReactionStateLiked value) liked,
    required TResult Function(ReactionStateUnliked value) unliked,
  }) {
    return loading(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ReactionStateLoading value)? loading,
    TResult Function(ReactionStateError value)? error,
    TResult Function(ReactionStateLiked value)? liked,
    TResult Function(ReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (loading != null) {
      return loading(this);
    }
    return orElse();
  }
}

abstract class ReactionStateLoading implements ReactionState {
  factory ReactionStateLoading() = _$ReactionStateLoading;
}

/// @nodoc
abstract class $ReactionStateErrorCopyWith<$Res> {
  factory $ReactionStateErrorCopyWith(
          ReactionStateError value, $Res Function(ReactionStateError) then) =
      _$ReactionStateErrorCopyWithImpl<$Res>;
  $Res call({String errorMessage});
}

/// @nodoc
class _$ReactionStateErrorCopyWithImpl<$Res>
    extends _$ReactionStateCopyWithImpl<$Res>
    implements $ReactionStateErrorCopyWith<$Res> {
  _$ReactionStateErrorCopyWithImpl(
      ReactionStateError _value, $Res Function(ReactionStateError) _then)
      : super(_value, (v) => _then(v as ReactionStateError));

  @override
  ReactionStateError get _value => super._value as ReactionStateError;

  @override
  $Res call({
    Object? errorMessage = freezed,
  }) {
    return _then(ReactionStateError(
      errorMessage == freezed
          ? _value.errorMessage
          : errorMessage // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc

class _$ReactionStateError implements ReactionStateError {
  _$ReactionStateError(this.errorMessage);

  @override
  final String errorMessage;

  @override
  String toString() {
    return 'ReactionState.error(errorMessage: $errorMessage)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is ReactionStateError &&
            (identical(other.errorMessage, errorMessage) ||
                const DeepCollectionEquality()
                    .equals(other.errorMessage, errorMessage)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^ const DeepCollectionEquality().hash(errorMessage);

  @JsonKey(ignore: true)
  @override
  $ReactionStateErrorCopyWith<ReactionStateError> get copyWith =>
      _$ReactionStateErrorCopyWithImpl<ReactionStateError>(this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
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
    required TResult Function(ReactionStateLoading value) loading,
    required TResult Function(ReactionStateError value) error,
    required TResult Function(ReactionStateLiked value) liked,
    required TResult Function(ReactionStateUnliked value) unliked,
  }) {
    return error(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ReactionStateLoading value)? loading,
    TResult Function(ReactionStateError value)? error,
    TResult Function(ReactionStateLiked value)? liked,
    TResult Function(ReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (error != null) {
      return error(this);
    }
    return orElse();
  }
}

abstract class ReactionStateError implements ReactionState {
  factory ReactionStateError(String errorMessage) = _$ReactionStateError;

  String get errorMessage => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ReactionStateErrorCopyWith<ReactionStateError> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ReactionStateLikedCopyWith<$Res> {
  factory $ReactionStateLikedCopyWith(
          ReactionStateLiked value, $Res Function(ReactionStateLiked) then) =
      _$ReactionStateLikedCopyWithImpl<$Res>;
}

/// @nodoc
class _$ReactionStateLikedCopyWithImpl<$Res>
    extends _$ReactionStateCopyWithImpl<$Res>
    implements $ReactionStateLikedCopyWith<$Res> {
  _$ReactionStateLikedCopyWithImpl(
      ReactionStateLiked _value, $Res Function(ReactionStateLiked) _then)
      : super(_value, (v) => _then(v as ReactionStateLiked));

  @override
  ReactionStateLiked get _value => super._value as ReactionStateLiked;
}

/// @nodoc

class _$ReactionStateLiked implements ReactionStateLiked {
  _$ReactionStateLiked();

  @override
  String toString() {
    return 'ReactionState.liked()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is ReactionStateLiked);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
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
    required TResult Function(ReactionStateLoading value) loading,
    required TResult Function(ReactionStateError value) error,
    required TResult Function(ReactionStateLiked value) liked,
    required TResult Function(ReactionStateUnliked value) unliked,
  }) {
    return liked(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ReactionStateLoading value)? loading,
    TResult Function(ReactionStateError value)? error,
    TResult Function(ReactionStateLiked value)? liked,
    TResult Function(ReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (liked != null) {
      return liked(this);
    }
    return orElse();
  }
}

abstract class ReactionStateLiked implements ReactionState {
  factory ReactionStateLiked() = _$ReactionStateLiked;
}

/// @nodoc
abstract class $ReactionStateUnlikedCopyWith<$Res> {
  factory $ReactionStateUnlikedCopyWith(ReactionStateUnliked value,
          $Res Function(ReactionStateUnliked) then) =
      _$ReactionStateUnlikedCopyWithImpl<$Res>;
}

/// @nodoc
class _$ReactionStateUnlikedCopyWithImpl<$Res>
    extends _$ReactionStateCopyWithImpl<$Res>
    implements $ReactionStateUnlikedCopyWith<$Res> {
  _$ReactionStateUnlikedCopyWithImpl(
      ReactionStateUnliked _value, $Res Function(ReactionStateUnliked) _then)
      : super(_value, (v) => _then(v as ReactionStateUnliked));

  @override
  ReactionStateUnliked get _value => super._value as ReactionStateUnliked;
}

/// @nodoc

class _$ReactionStateUnliked implements ReactionStateUnliked {
  _$ReactionStateUnliked();

  @override
  String toString() {
    return 'ReactionState.unliked()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is ReactionStateUnliked);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
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
    required TResult Function(ReactionStateLoading value) loading,
    required TResult Function(ReactionStateError value) error,
    required TResult Function(ReactionStateLiked value) liked,
    required TResult Function(ReactionStateUnliked value) unliked,
  }) {
    return unliked(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ReactionStateLoading value)? loading,
    TResult Function(ReactionStateError value)? error,
    TResult Function(ReactionStateLiked value)? liked,
    TResult Function(ReactionStateUnliked value)? unliked,
    required TResult orElse(),
  }) {
    if (unliked != null) {
      return unliked(this);
    }
    return orElse();
  }
}

abstract class ReactionStateUnliked implements ReactionState {
  factory ReactionStateUnliked() = _$ReactionStateUnliked;
}

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides

part of 'song_recognition_cubit.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
class _$SongRecognitionStateTearOff {
  const _$SongRecognitionStateTearOff();

  SongRecognitionLoading loading() {
    return SongRecognitionLoading();
  }

  SongRecognitionError error(String message) {
    return SongRecognitionError(
      message,
    );
  }

  SongRecognitionMissingPermissions missingPermissions() {
    return SongRecognitionMissingPermissions();
  }

  SongRecognitionReady ready(Song? lastQuery) {
    return SongRecognitionReady(
      lastQuery,
    );
  }

  SongRecognitionRecording recording(int tryNumber) {
    return SongRecognitionRecording(
      tryNumber,
    );
  }

  SongRecognitionFail fail() {
    return SongRecognitionFail();
  }
}

/// @nodoc
const $SongRecognitionState = _$SongRecognitionStateTearOff();

/// @nodoc
mixin _$SongRecognitionState {
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() loading,
    required TResult Function(String message) error,
    required TResult Function() missingPermissions,
    required TResult Function(Song? lastQuery) ready,
    required TResult Function(int tryNumber) recording,
    required TResult Function() fail,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? loading,
    TResult Function(String message)? error,
    TResult Function()? missingPermissions,
    TResult Function(Song? lastQuery)? ready,
    TResult Function(int tryNumber)? recording,
    TResult Function()? fail,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(SongRecognitionLoading value) loading,
    required TResult Function(SongRecognitionError value) error,
    required TResult Function(SongRecognitionMissingPermissions value)
        missingPermissions,
    required TResult Function(SongRecognitionReady value) ready,
    required TResult Function(SongRecognitionRecording value) recording,
    required TResult Function(SongRecognitionFail value) fail,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(SongRecognitionLoading value)? loading,
    TResult Function(SongRecognitionError value)? error,
    TResult Function(SongRecognitionMissingPermissions value)?
        missingPermissions,
    TResult Function(SongRecognitionReady value)? ready,
    TResult Function(SongRecognitionRecording value)? recording,
    TResult Function(SongRecognitionFail value)? fail,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SongRecognitionStateCopyWith<$Res> {
  factory $SongRecognitionStateCopyWith(SongRecognitionState value,
          $Res Function(SongRecognitionState) then) =
      _$SongRecognitionStateCopyWithImpl<$Res>;
}

/// @nodoc
class _$SongRecognitionStateCopyWithImpl<$Res>
    implements $SongRecognitionStateCopyWith<$Res> {
  _$SongRecognitionStateCopyWithImpl(this._value, this._then);

  final SongRecognitionState _value;
  // ignore: unused_field
  final $Res Function(SongRecognitionState) _then;
}

/// @nodoc
abstract class $SongRecognitionLoadingCopyWith<$Res> {
  factory $SongRecognitionLoadingCopyWith(SongRecognitionLoading value,
          $Res Function(SongRecognitionLoading) then) =
      _$SongRecognitionLoadingCopyWithImpl<$Res>;
}

/// @nodoc
class _$SongRecognitionLoadingCopyWithImpl<$Res>
    extends _$SongRecognitionStateCopyWithImpl<$Res>
    implements $SongRecognitionLoadingCopyWith<$Res> {
  _$SongRecognitionLoadingCopyWithImpl(SongRecognitionLoading _value,
      $Res Function(SongRecognitionLoading) _then)
      : super(_value, (v) => _then(v as SongRecognitionLoading));

  @override
  SongRecognitionLoading get _value => super._value as SongRecognitionLoading;
}

/// @nodoc

class _$SongRecognitionLoading implements SongRecognitionLoading {
  _$SongRecognitionLoading();

  @override
  String toString() {
    return 'SongRecognitionState.loading()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is SongRecognitionLoading);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() loading,
    required TResult Function(String message) error,
    required TResult Function() missingPermissions,
    required TResult Function(Song? lastQuery) ready,
    required TResult Function(int tryNumber) recording,
    required TResult Function() fail,
  }) {
    return loading();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? loading,
    TResult Function(String message)? error,
    TResult Function()? missingPermissions,
    TResult Function(Song? lastQuery)? ready,
    TResult Function(int tryNumber)? recording,
    TResult Function()? fail,
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
    required TResult Function(SongRecognitionLoading value) loading,
    required TResult Function(SongRecognitionError value) error,
    required TResult Function(SongRecognitionMissingPermissions value)
        missingPermissions,
    required TResult Function(SongRecognitionReady value) ready,
    required TResult Function(SongRecognitionRecording value) recording,
    required TResult Function(SongRecognitionFail value) fail,
  }) {
    return loading(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(SongRecognitionLoading value)? loading,
    TResult Function(SongRecognitionError value)? error,
    TResult Function(SongRecognitionMissingPermissions value)?
        missingPermissions,
    TResult Function(SongRecognitionReady value)? ready,
    TResult Function(SongRecognitionRecording value)? recording,
    TResult Function(SongRecognitionFail value)? fail,
    required TResult orElse(),
  }) {
    if (loading != null) {
      return loading(this);
    }
    return orElse();
  }
}

abstract class SongRecognitionLoading implements SongRecognitionState {
  factory SongRecognitionLoading() = _$SongRecognitionLoading;
}

/// @nodoc
abstract class $SongRecognitionErrorCopyWith<$Res> {
  factory $SongRecognitionErrorCopyWith(SongRecognitionError value,
          $Res Function(SongRecognitionError) then) =
      _$SongRecognitionErrorCopyWithImpl<$Res>;
  $Res call({String message});
}

/// @nodoc
class _$SongRecognitionErrorCopyWithImpl<$Res>
    extends _$SongRecognitionStateCopyWithImpl<$Res>
    implements $SongRecognitionErrorCopyWith<$Res> {
  _$SongRecognitionErrorCopyWithImpl(
      SongRecognitionError _value, $Res Function(SongRecognitionError) _then)
      : super(_value, (v) => _then(v as SongRecognitionError));

  @override
  SongRecognitionError get _value => super._value as SongRecognitionError;

  @override
  $Res call({
    Object? message = freezed,
  }) {
    return _then(SongRecognitionError(
      message == freezed
          ? _value.message
          : message // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc

class _$SongRecognitionError implements SongRecognitionError {
  _$SongRecognitionError(this.message);

  @override
  final String message;

  @override
  String toString() {
    return 'SongRecognitionState.error(message: $message)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is SongRecognitionError &&
            (identical(other.message, message) ||
                const DeepCollectionEquality().equals(other.message, message)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^ const DeepCollectionEquality().hash(message);

  @JsonKey(ignore: true)
  @override
  $SongRecognitionErrorCopyWith<SongRecognitionError> get copyWith =>
      _$SongRecognitionErrorCopyWithImpl<SongRecognitionError>(
          this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() loading,
    required TResult Function(String message) error,
    required TResult Function() missingPermissions,
    required TResult Function(Song? lastQuery) ready,
    required TResult Function(int tryNumber) recording,
    required TResult Function() fail,
  }) {
    return error(message);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? loading,
    TResult Function(String message)? error,
    TResult Function()? missingPermissions,
    TResult Function(Song? lastQuery)? ready,
    TResult Function(int tryNumber)? recording,
    TResult Function()? fail,
    required TResult orElse(),
  }) {
    if (error != null) {
      return error(message);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(SongRecognitionLoading value) loading,
    required TResult Function(SongRecognitionError value) error,
    required TResult Function(SongRecognitionMissingPermissions value)
        missingPermissions,
    required TResult Function(SongRecognitionReady value) ready,
    required TResult Function(SongRecognitionRecording value) recording,
    required TResult Function(SongRecognitionFail value) fail,
  }) {
    return error(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(SongRecognitionLoading value)? loading,
    TResult Function(SongRecognitionError value)? error,
    TResult Function(SongRecognitionMissingPermissions value)?
        missingPermissions,
    TResult Function(SongRecognitionReady value)? ready,
    TResult Function(SongRecognitionRecording value)? recording,
    TResult Function(SongRecognitionFail value)? fail,
    required TResult orElse(),
  }) {
    if (error != null) {
      return error(this);
    }
    return orElse();
  }
}

abstract class SongRecognitionError implements SongRecognitionState {
  factory SongRecognitionError(String message) = _$SongRecognitionError;

  String get message => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $SongRecognitionErrorCopyWith<SongRecognitionError> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SongRecognitionMissingPermissionsCopyWith<$Res> {
  factory $SongRecognitionMissingPermissionsCopyWith(
          SongRecognitionMissingPermissions value,
          $Res Function(SongRecognitionMissingPermissions) then) =
      _$SongRecognitionMissingPermissionsCopyWithImpl<$Res>;
}

/// @nodoc
class _$SongRecognitionMissingPermissionsCopyWithImpl<$Res>
    extends _$SongRecognitionStateCopyWithImpl<$Res>
    implements $SongRecognitionMissingPermissionsCopyWith<$Res> {
  _$SongRecognitionMissingPermissionsCopyWithImpl(
      SongRecognitionMissingPermissions _value,
      $Res Function(SongRecognitionMissingPermissions) _then)
      : super(_value, (v) => _then(v as SongRecognitionMissingPermissions));

  @override
  SongRecognitionMissingPermissions get _value =>
      super._value as SongRecognitionMissingPermissions;
}

/// @nodoc

class _$SongRecognitionMissingPermissions
    implements SongRecognitionMissingPermissions {
  _$SongRecognitionMissingPermissions();

  @override
  String toString() {
    return 'SongRecognitionState.missingPermissions()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is SongRecognitionMissingPermissions);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() loading,
    required TResult Function(String message) error,
    required TResult Function() missingPermissions,
    required TResult Function(Song? lastQuery) ready,
    required TResult Function(int tryNumber) recording,
    required TResult Function() fail,
  }) {
    return missingPermissions();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? loading,
    TResult Function(String message)? error,
    TResult Function()? missingPermissions,
    TResult Function(Song? lastQuery)? ready,
    TResult Function(int tryNumber)? recording,
    TResult Function()? fail,
    required TResult orElse(),
  }) {
    if (missingPermissions != null) {
      return missingPermissions();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(SongRecognitionLoading value) loading,
    required TResult Function(SongRecognitionError value) error,
    required TResult Function(SongRecognitionMissingPermissions value)
        missingPermissions,
    required TResult Function(SongRecognitionReady value) ready,
    required TResult Function(SongRecognitionRecording value) recording,
    required TResult Function(SongRecognitionFail value) fail,
  }) {
    return missingPermissions(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(SongRecognitionLoading value)? loading,
    TResult Function(SongRecognitionError value)? error,
    TResult Function(SongRecognitionMissingPermissions value)?
        missingPermissions,
    TResult Function(SongRecognitionReady value)? ready,
    TResult Function(SongRecognitionRecording value)? recording,
    TResult Function(SongRecognitionFail value)? fail,
    required TResult orElse(),
  }) {
    if (missingPermissions != null) {
      return missingPermissions(this);
    }
    return orElse();
  }
}

abstract class SongRecognitionMissingPermissions
    implements SongRecognitionState {
  factory SongRecognitionMissingPermissions() =
      _$SongRecognitionMissingPermissions;
}

/// @nodoc
abstract class $SongRecognitionReadyCopyWith<$Res> {
  factory $SongRecognitionReadyCopyWith(SongRecognitionReady value,
          $Res Function(SongRecognitionReady) then) =
      _$SongRecognitionReadyCopyWithImpl<$Res>;
  $Res call({Song? lastQuery});
}

/// @nodoc
class _$SongRecognitionReadyCopyWithImpl<$Res>
    extends _$SongRecognitionStateCopyWithImpl<$Res>
    implements $SongRecognitionReadyCopyWith<$Res> {
  _$SongRecognitionReadyCopyWithImpl(
      SongRecognitionReady _value, $Res Function(SongRecognitionReady) _then)
      : super(_value, (v) => _then(v as SongRecognitionReady));

  @override
  SongRecognitionReady get _value => super._value as SongRecognitionReady;

  @override
  $Res call({
    Object? lastQuery = freezed,
  }) {
    return _then(SongRecognitionReady(
      lastQuery == freezed
          ? _value.lastQuery
          : lastQuery // ignore: cast_nullable_to_non_nullable
              as Song?,
    ));
  }
}

/// @nodoc

class _$SongRecognitionReady implements SongRecognitionReady {
  _$SongRecognitionReady(this.lastQuery);

  @override
  final Song? lastQuery;

  @override
  String toString() {
    return 'SongRecognitionState.ready(lastQuery: $lastQuery)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is SongRecognitionReady &&
            (identical(other.lastQuery, lastQuery) ||
                const DeepCollectionEquality()
                    .equals(other.lastQuery, lastQuery)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^ const DeepCollectionEquality().hash(lastQuery);

  @JsonKey(ignore: true)
  @override
  $SongRecognitionReadyCopyWith<SongRecognitionReady> get copyWith =>
      _$SongRecognitionReadyCopyWithImpl<SongRecognitionReady>(
          this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() loading,
    required TResult Function(String message) error,
    required TResult Function() missingPermissions,
    required TResult Function(Song? lastQuery) ready,
    required TResult Function(int tryNumber) recording,
    required TResult Function() fail,
  }) {
    return ready(lastQuery);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? loading,
    TResult Function(String message)? error,
    TResult Function()? missingPermissions,
    TResult Function(Song? lastQuery)? ready,
    TResult Function(int tryNumber)? recording,
    TResult Function()? fail,
    required TResult orElse(),
  }) {
    if (ready != null) {
      return ready(lastQuery);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(SongRecognitionLoading value) loading,
    required TResult Function(SongRecognitionError value) error,
    required TResult Function(SongRecognitionMissingPermissions value)
        missingPermissions,
    required TResult Function(SongRecognitionReady value) ready,
    required TResult Function(SongRecognitionRecording value) recording,
    required TResult Function(SongRecognitionFail value) fail,
  }) {
    return ready(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(SongRecognitionLoading value)? loading,
    TResult Function(SongRecognitionError value)? error,
    TResult Function(SongRecognitionMissingPermissions value)?
        missingPermissions,
    TResult Function(SongRecognitionReady value)? ready,
    TResult Function(SongRecognitionRecording value)? recording,
    TResult Function(SongRecognitionFail value)? fail,
    required TResult orElse(),
  }) {
    if (ready != null) {
      return ready(this);
    }
    return orElse();
  }
}

abstract class SongRecognitionReady implements SongRecognitionState {
  factory SongRecognitionReady(Song? lastQuery) = _$SongRecognitionReady;

  Song? get lastQuery => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $SongRecognitionReadyCopyWith<SongRecognitionReady> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SongRecognitionRecordingCopyWith<$Res> {
  factory $SongRecognitionRecordingCopyWith(SongRecognitionRecording value,
          $Res Function(SongRecognitionRecording) then) =
      _$SongRecognitionRecordingCopyWithImpl<$Res>;
  $Res call({int tryNumber});
}

/// @nodoc
class _$SongRecognitionRecordingCopyWithImpl<$Res>
    extends _$SongRecognitionStateCopyWithImpl<$Res>
    implements $SongRecognitionRecordingCopyWith<$Res> {
  _$SongRecognitionRecordingCopyWithImpl(SongRecognitionRecording _value,
      $Res Function(SongRecognitionRecording) _then)
      : super(_value, (v) => _then(v as SongRecognitionRecording));

  @override
  SongRecognitionRecording get _value =>
      super._value as SongRecognitionRecording;

  @override
  $Res call({
    Object? tryNumber = freezed,
  }) {
    return _then(SongRecognitionRecording(
      tryNumber == freezed
          ? _value.tryNumber
          : tryNumber // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc

class _$SongRecognitionRecording implements SongRecognitionRecording {
  _$SongRecognitionRecording(this.tryNumber);

  @override
  final int tryNumber;

  @override
  String toString() {
    return 'SongRecognitionState.recording(tryNumber: $tryNumber)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is SongRecognitionRecording &&
            (identical(other.tryNumber, tryNumber) ||
                const DeepCollectionEquality()
                    .equals(other.tryNumber, tryNumber)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^ const DeepCollectionEquality().hash(tryNumber);

  @JsonKey(ignore: true)
  @override
  $SongRecognitionRecordingCopyWith<SongRecognitionRecording> get copyWith =>
      _$SongRecognitionRecordingCopyWithImpl<SongRecognitionRecording>(
          this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() loading,
    required TResult Function(String message) error,
    required TResult Function() missingPermissions,
    required TResult Function(Song? lastQuery) ready,
    required TResult Function(int tryNumber) recording,
    required TResult Function() fail,
  }) {
    return recording(tryNumber);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? loading,
    TResult Function(String message)? error,
    TResult Function()? missingPermissions,
    TResult Function(Song? lastQuery)? ready,
    TResult Function(int tryNumber)? recording,
    TResult Function()? fail,
    required TResult orElse(),
  }) {
    if (recording != null) {
      return recording(tryNumber);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(SongRecognitionLoading value) loading,
    required TResult Function(SongRecognitionError value) error,
    required TResult Function(SongRecognitionMissingPermissions value)
        missingPermissions,
    required TResult Function(SongRecognitionReady value) ready,
    required TResult Function(SongRecognitionRecording value) recording,
    required TResult Function(SongRecognitionFail value) fail,
  }) {
    return recording(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(SongRecognitionLoading value)? loading,
    TResult Function(SongRecognitionError value)? error,
    TResult Function(SongRecognitionMissingPermissions value)?
        missingPermissions,
    TResult Function(SongRecognitionReady value)? ready,
    TResult Function(SongRecognitionRecording value)? recording,
    TResult Function(SongRecognitionFail value)? fail,
    required TResult orElse(),
  }) {
    if (recording != null) {
      return recording(this);
    }
    return orElse();
  }
}

abstract class SongRecognitionRecording implements SongRecognitionState {
  factory SongRecognitionRecording(int tryNumber) = _$SongRecognitionRecording;

  int get tryNumber => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $SongRecognitionRecordingCopyWith<SongRecognitionRecording> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SongRecognitionFailCopyWith<$Res> {
  factory $SongRecognitionFailCopyWith(
          SongRecognitionFail value, $Res Function(SongRecognitionFail) then) =
      _$SongRecognitionFailCopyWithImpl<$Res>;
}

/// @nodoc
class _$SongRecognitionFailCopyWithImpl<$Res>
    extends _$SongRecognitionStateCopyWithImpl<$Res>
    implements $SongRecognitionFailCopyWith<$Res> {
  _$SongRecognitionFailCopyWithImpl(
      SongRecognitionFail _value, $Res Function(SongRecognitionFail) _then)
      : super(_value, (v) => _then(v as SongRecognitionFail));

  @override
  SongRecognitionFail get _value => super._value as SongRecognitionFail;
}

/// @nodoc

class _$SongRecognitionFail implements SongRecognitionFail {
  _$SongRecognitionFail();

  @override
  String toString() {
    return 'SongRecognitionState.fail()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is SongRecognitionFail);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() loading,
    required TResult Function(String message) error,
    required TResult Function() missingPermissions,
    required TResult Function(Song? lastQuery) ready,
    required TResult Function(int tryNumber) recording,
    required TResult Function() fail,
  }) {
    return fail();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? loading,
    TResult Function(String message)? error,
    TResult Function()? missingPermissions,
    TResult Function(Song? lastQuery)? ready,
    TResult Function(int tryNumber)? recording,
    TResult Function()? fail,
    required TResult orElse(),
  }) {
    if (fail != null) {
      return fail();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(SongRecognitionLoading value) loading,
    required TResult Function(SongRecognitionError value) error,
    required TResult Function(SongRecognitionMissingPermissions value)
        missingPermissions,
    required TResult Function(SongRecognitionReady value) ready,
    required TResult Function(SongRecognitionRecording value) recording,
    required TResult Function(SongRecognitionFail value) fail,
  }) {
    return fail(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(SongRecognitionLoading value)? loading,
    TResult Function(SongRecognitionError value)? error,
    TResult Function(SongRecognitionMissingPermissions value)?
        missingPermissions,
    TResult Function(SongRecognitionReady value)? ready,
    TResult Function(SongRecognitionRecording value)? recording,
    TResult Function(SongRecognitionFail value)? fail,
    required TResult orElse(),
  }) {
    if (fail != null) {
      return fail(this);
    }
    return orElse();
  }
}

abstract class SongRecognitionFail implements SongRecognitionState {
  factory SongRecognitionFail() = _$SongRecognitionFail;
}

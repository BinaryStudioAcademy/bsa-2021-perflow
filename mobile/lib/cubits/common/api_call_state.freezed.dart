// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides

part of 'api_call_state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
class _$ApiCallStateTearOff {
  const _$ApiCallStateTearOff();

  ApiCallStateLoading<TData> loading<TData>() {
    return ApiCallStateLoading<TData>();
  }

  ApiCallStateError<TData> error<TData>(String message) {
    return ApiCallStateError<TData>(
      message,
    );
  }

  ApiCallStateData<TData> data<TData>(TData data) {
    return ApiCallStateData<TData>(
      data,
    );
  }
}

/// @nodoc
const $ApiCallState = _$ApiCallStateTearOff();

/// @nodoc
mixin _$ApiCallState<TData> {
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() loading,
    required TResult Function(String message) error,
    required TResult Function(TData data) data,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? loading,
    TResult Function(String message)? error,
    TResult Function(TData data)? data,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(ApiCallStateLoading<TData> value) loading,
    required TResult Function(ApiCallStateError<TData> value) error,
    required TResult Function(ApiCallStateData<TData> value) data,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ApiCallStateLoading<TData> value)? loading,
    TResult Function(ApiCallStateError<TData> value)? error,
    TResult Function(ApiCallStateData<TData> value)? data,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ApiCallStateCopyWith<TData, $Res> {
  factory $ApiCallStateCopyWith(
          ApiCallState<TData> value, $Res Function(ApiCallState<TData>) then) =
      _$ApiCallStateCopyWithImpl<TData, $Res>;
}

/// @nodoc
class _$ApiCallStateCopyWithImpl<TData, $Res>
    implements $ApiCallStateCopyWith<TData, $Res> {
  _$ApiCallStateCopyWithImpl(this._value, this._then);

  final ApiCallState<TData> _value;
  // ignore: unused_field
  final $Res Function(ApiCallState<TData>) _then;
}

/// @nodoc
abstract class $ApiCallStateLoadingCopyWith<TData, $Res> {
  factory $ApiCallStateLoadingCopyWith(ApiCallStateLoading<TData> value,
          $Res Function(ApiCallStateLoading<TData>) then) =
      _$ApiCallStateLoadingCopyWithImpl<TData, $Res>;
}

/// @nodoc
class _$ApiCallStateLoadingCopyWithImpl<TData, $Res>
    extends _$ApiCallStateCopyWithImpl<TData, $Res>
    implements $ApiCallStateLoadingCopyWith<TData, $Res> {
  _$ApiCallStateLoadingCopyWithImpl(ApiCallStateLoading<TData> _value,
      $Res Function(ApiCallStateLoading<TData>) _then)
      : super(_value, (v) => _then(v as ApiCallStateLoading<TData>));

  @override
  ApiCallStateLoading<TData> get _value =>
      super._value as ApiCallStateLoading<TData>;
}

/// @nodoc

class _$ApiCallStateLoading<TData> implements ApiCallStateLoading<TData> {
  _$ApiCallStateLoading();

  @override
  String toString() {
    return 'ApiCallState<$TData>.loading()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) || (other is ApiCallStateLoading<TData>);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() loading,
    required TResult Function(String message) error,
    required TResult Function(TData data) data,
  }) {
    return loading();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? loading,
    TResult Function(String message)? error,
    TResult Function(TData data)? data,
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
    required TResult Function(ApiCallStateLoading<TData> value) loading,
    required TResult Function(ApiCallStateError<TData> value) error,
    required TResult Function(ApiCallStateData<TData> value) data,
  }) {
    return loading(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ApiCallStateLoading<TData> value)? loading,
    TResult Function(ApiCallStateError<TData> value)? error,
    TResult Function(ApiCallStateData<TData> value)? data,
    required TResult orElse(),
  }) {
    if (loading != null) {
      return loading(this);
    }
    return orElse();
  }
}

abstract class ApiCallStateLoading<TData> implements ApiCallState<TData> {
  factory ApiCallStateLoading() = _$ApiCallStateLoading<TData>;
}

/// @nodoc
abstract class $ApiCallStateErrorCopyWith<TData, $Res> {
  factory $ApiCallStateErrorCopyWith(ApiCallStateError<TData> value,
          $Res Function(ApiCallStateError<TData>) then) =
      _$ApiCallStateErrorCopyWithImpl<TData, $Res>;
  $Res call({String message});
}

/// @nodoc
class _$ApiCallStateErrorCopyWithImpl<TData, $Res>
    extends _$ApiCallStateCopyWithImpl<TData, $Res>
    implements $ApiCallStateErrorCopyWith<TData, $Res> {
  _$ApiCallStateErrorCopyWithImpl(ApiCallStateError<TData> _value,
      $Res Function(ApiCallStateError<TData>) _then)
      : super(_value, (v) => _then(v as ApiCallStateError<TData>));

  @override
  ApiCallStateError<TData> get _value =>
      super._value as ApiCallStateError<TData>;

  @override
  $Res call({
    Object? message = freezed,
  }) {
    return _then(ApiCallStateError<TData>(
      message == freezed
          ? _value.message
          : message // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc

class _$ApiCallStateError<TData> implements ApiCallStateError<TData> {
  _$ApiCallStateError(this.message);

  @override
  final String message;

  @override
  String toString() {
    return 'ApiCallState<$TData>.error(message: $message)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is ApiCallStateError<TData> &&
            (identical(other.message, message) ||
                const DeepCollectionEquality().equals(other.message, message)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^ const DeepCollectionEquality().hash(message);

  @JsonKey(ignore: true)
  @override
  $ApiCallStateErrorCopyWith<TData, ApiCallStateError<TData>> get copyWith =>
      _$ApiCallStateErrorCopyWithImpl<TData, ApiCallStateError<TData>>(
          this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() loading,
    required TResult Function(String message) error,
    required TResult Function(TData data) data,
  }) {
    return error(message);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? loading,
    TResult Function(String message)? error,
    TResult Function(TData data)? data,
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
    required TResult Function(ApiCallStateLoading<TData> value) loading,
    required TResult Function(ApiCallStateError<TData> value) error,
    required TResult Function(ApiCallStateData<TData> value) data,
  }) {
    return error(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ApiCallStateLoading<TData> value)? loading,
    TResult Function(ApiCallStateError<TData> value)? error,
    TResult Function(ApiCallStateData<TData> value)? data,
    required TResult orElse(),
  }) {
    if (error != null) {
      return error(this);
    }
    return orElse();
  }
}

abstract class ApiCallStateError<TData> implements ApiCallState<TData> {
  factory ApiCallStateError(String message) = _$ApiCallStateError<TData>;

  String get message => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ApiCallStateErrorCopyWith<TData, ApiCallStateError<TData>> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ApiCallStateDataCopyWith<TData, $Res> {
  factory $ApiCallStateDataCopyWith(ApiCallStateData<TData> value,
          $Res Function(ApiCallStateData<TData>) then) =
      _$ApiCallStateDataCopyWithImpl<TData, $Res>;
  $Res call({TData data});
}

/// @nodoc
class _$ApiCallStateDataCopyWithImpl<TData, $Res>
    extends _$ApiCallStateCopyWithImpl<TData, $Res>
    implements $ApiCallStateDataCopyWith<TData, $Res> {
  _$ApiCallStateDataCopyWithImpl(ApiCallStateData<TData> _value,
      $Res Function(ApiCallStateData<TData>) _then)
      : super(_value, (v) => _then(v as ApiCallStateData<TData>));

  @override
  ApiCallStateData<TData> get _value => super._value as ApiCallStateData<TData>;

  @override
  $Res call({
    Object? data = freezed,
  }) {
    return _then(ApiCallStateData<TData>(
      data == freezed
          ? _value.data
          : data // ignore: cast_nullable_to_non_nullable
              as TData,
    ));
  }
}

/// @nodoc

class _$ApiCallStateData<TData> implements ApiCallStateData<TData> {
  _$ApiCallStateData(this.data);

  @override
  final TData data;

  @override
  String toString() {
    return 'ApiCallState<$TData>.data(data: $data)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is ApiCallStateData<TData> &&
            (identical(other.data, data) ||
                const DeepCollectionEquality().equals(other.data, data)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^ const DeepCollectionEquality().hash(data);

  @JsonKey(ignore: true)
  @override
  $ApiCallStateDataCopyWith<TData, ApiCallStateData<TData>> get copyWith =>
      _$ApiCallStateDataCopyWithImpl<TData, ApiCallStateData<TData>>(
          this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() loading,
    required TResult Function(String message) error,
    required TResult Function(TData data) data,
  }) {
    return data(this.data);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? loading,
    TResult Function(String message)? error,
    TResult Function(TData data)? data,
    required TResult orElse(),
  }) {
    if (data != null) {
      return data(this.data);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(ApiCallStateLoading<TData> value) loading,
    required TResult Function(ApiCallStateError<TData> value) error,
    required TResult Function(ApiCallStateData<TData> value) data,
  }) {
    return data(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(ApiCallStateLoading<TData> value)? loading,
    TResult Function(ApiCallStateError<TData> value)? error,
    TResult Function(ApiCallStateData<TData> value)? data,
    required TResult orElse(),
  }) {
    if (data != null) {
      return data(this);
    }
    return orElse();
  }
}

abstract class ApiCallStateData<TData> implements ApiCallState<TData> {
  factory ApiCallStateData(TData data) = _$ApiCallStateData<TData>;

  TData get data => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ApiCallStateDataCopyWith<TData, ApiCallStateData<TData>> get copyWith =>
      throw _privateConstructorUsedError;
}

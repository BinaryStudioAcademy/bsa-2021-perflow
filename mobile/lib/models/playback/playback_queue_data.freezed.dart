// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides

part of 'playback_queue_data.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
class _$QueueDataTearOff {
  const _$QueueDataTearOff();

  _QueueData call({required IList<Song> songs, required int currentIndex}) {
    return _QueueData(
      songs: songs,
      currentIndex: currentIndex,
    );
  }
}

/// @nodoc
const $QueueData = _$QueueDataTearOff();

/// @nodoc
mixin _$QueueData {
  IList<Song> get songs => throw _privateConstructorUsedError;
  int get currentIndex => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $QueueDataCopyWith<QueueData> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $QueueDataCopyWith<$Res> {
  factory $QueueDataCopyWith(QueueData value, $Res Function(QueueData) then) =
      _$QueueDataCopyWithImpl<$Res>;
  $Res call({IList<Song> songs, int currentIndex});
}

/// @nodoc
class _$QueueDataCopyWithImpl<$Res> implements $QueueDataCopyWith<$Res> {
  _$QueueDataCopyWithImpl(this._value, this._then);

  final QueueData _value;
  // ignore: unused_field
  final $Res Function(QueueData) _then;

  @override
  $Res call({
    Object? songs = freezed,
    Object? currentIndex = freezed,
  }) {
    return _then(_value.copyWith(
      songs: songs == freezed
          ? _value.songs
          : songs // ignore: cast_nullable_to_non_nullable
              as IList<Song>,
      currentIndex: currentIndex == freezed
          ? _value.currentIndex
          : currentIndex // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc
abstract class _$QueueDataCopyWith<$Res> implements $QueueDataCopyWith<$Res> {
  factory _$QueueDataCopyWith(
          _QueueData value, $Res Function(_QueueData) then) =
      __$QueueDataCopyWithImpl<$Res>;
  @override
  $Res call({IList<Song> songs, int currentIndex});
}

/// @nodoc
class __$QueueDataCopyWithImpl<$Res> extends _$QueueDataCopyWithImpl<$Res>
    implements _$QueueDataCopyWith<$Res> {
  __$QueueDataCopyWithImpl(_QueueData _value, $Res Function(_QueueData) _then)
      : super(_value, (v) => _then(v as _QueueData));

  @override
  _QueueData get _value => super._value as _QueueData;

  @override
  $Res call({
    Object? songs = freezed,
    Object? currentIndex = freezed,
  }) {
    return _then(_QueueData(
      songs: songs == freezed
          ? _value.songs
          : songs // ignore: cast_nullable_to_non_nullable
              as IList<Song>,
      currentIndex: currentIndex == freezed
          ? _value.currentIndex
          : currentIndex // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc

class _$_QueueData extends _QueueData {
  _$_QueueData({required this.songs, required this.currentIndex}) : super._();

  @override
  final IList<Song> songs;
  @override
  final int currentIndex;

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other is _QueueData &&
            (identical(other.songs, songs) ||
                const DeepCollectionEquality().equals(other.songs, songs)) &&
            (identical(other.currentIndex, currentIndex) ||
                const DeepCollectionEquality()
                    .equals(other.currentIndex, currentIndex)));
  }

  @override
  int get hashCode =>
      runtimeType.hashCode ^
      const DeepCollectionEquality().hash(songs) ^
      const DeepCollectionEquality().hash(currentIndex);

  @JsonKey(ignore: true)
  @override
  _$QueueDataCopyWith<_QueueData> get copyWith =>
      __$QueueDataCopyWithImpl<_QueueData>(this, _$identity);
}

abstract class _QueueData extends QueueData {
  factory _QueueData({required IList<Song> songs, required int currentIndex}) =
      _$_QueueData;
  _QueueData._() : super._();

  @override
  IList<Song> get songs => throw _privateConstructorUsedError;
  @override
  int get currentIndex => throw _privateConstructorUsedError;
  @override
  @JsonKey(ignore: true)
  _$QueueDataCopyWith<_QueueData> get copyWith =>
      throw _privateConstructorUsedError;
}

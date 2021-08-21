// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'playlist_info.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PlaylistInfo _$PlaylistInfoFromJson(Map<String, dynamic> json) {
  return PlaylistInfo(
    id: json['id'] as int,
    name: json['name'] as String,
    description: json['description'] as String?,
    accessType: _$enumDecode(_$PlaylistAccessTypeEnumMap, json['accessType']),
    author: ArtistSimplified.fromJson(json['author'] as Map<String, dynamic>),
    createdAt: DateTime.parse(json['createdAt'] as String),
    isLiked: json['isLiked'] as bool,
    iconURL: json['iconURL'] as String?,
  );
}

Map<String, dynamic> _$PlaylistInfoToJson(PlaylistInfo instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'description': instance.description,
      'accessType': _$PlaylistAccessTypeEnumMap[instance.accessType],
      'author': instance.author,
      'createdAt': instance.createdAt.toIso8601String(),
      'isLiked': instance.isLiked,
      'iconURL': instance.iconURL,
    };

K _$enumDecode<K, V>(
  Map<K, V> enumValues,
  Object? source, {
  K? unknownValue,
}) {
  if (source == null) {
    throw ArgumentError(
      'A value must be provided. Supported values: '
      '${enumValues.values.join(', ')}',
    );
  }

  return enumValues.entries.singleWhere(
    (e) => e.value == source,
    orElse: () {
      if (unknownValue == null) {
        throw ArgumentError(
          '`$source` is not one of the supported values: '
          '${enumValues.values.join(', ')}',
        );
      }
      return MapEntry(unknownValue, enumValues.values.first);
    },
  ).key;
}

const _$PlaylistAccessTypeEnumMap = {
  PlaylistAccessType.secret: 0,
  PlaylistAccessType.collaborative: 1,
  PlaylistAccessType.public: 2,
};

// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'album_simplified.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AlbumSimplified _$AlbumSimplifiedFromJson(Map<String, dynamic> json) {
  return AlbumSimplified(
    id: json['id'] as int,
    name: json['name'] as String,
    iconURL: json['iconURL'] as String?,
  );
}

Map<String, dynamic> _$AlbumSimplifiedToJson(AlbumSimplified instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'iconURL': instance.iconURL,
    };

// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'album_simplified.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AlbumSimplified _$AlbumSimplifiedFromJson(Map<String, dynamic> json) {
  return AlbumSimplified(
    id: json['id'] as int,
    name: json['name'] as String,
    releaseYear: json['releaseYear'] as int?,
    iconURL: json['iconURL'] as String?,
    author: json['author'] == null
        ? null
        : AlbumArtistSimplified.fromJson(
            json['author'] as Map<String, dynamic>),
    group: json['group'] == null
        ? null
        : GroupSimplified.fromJson(json['group'] as Map<String, dynamic>),
  );
}

Map<String, dynamic> _$AlbumSimplifiedToJson(AlbumSimplified instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'iconURL': instance.iconURL,
      'releaseYear': instance.releaseYear,
      'author': instance.author,
      'group': instance.group,
    };

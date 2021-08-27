// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'playlist_simplified.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PlaylistSimplified _$PlaylistSimplifiedFromJson(Map<String, dynamic> json) {
  return PlaylistSimplified(
    id: json['id'] as int,
    name: json['name'] as String,
    description: json['description'] as String?,
    iconURL: json['iconURL'] as String?,
  );
}

Map<String, dynamic> _$PlaylistSimplifiedToJson(PlaylistSimplified instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'description': instance.description,
      'iconURL': instance.iconURL,
    };

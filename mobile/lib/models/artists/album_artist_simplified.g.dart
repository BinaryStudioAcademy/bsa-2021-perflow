// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'album_artist_simplified.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AlbumArtistSimplified _$AlbumArtistSimplifiedFromJson(
    Map<String, dynamic> json) {
  return AlbumArtistSimplified(
    id: json['id'] as int,
    name: json['name'] as String,
    iconUrl: json['iconUrl'] as String?,
  );
}

Map<String, dynamic> _$AlbumArtistSimplifiedToJson(
        AlbumArtistSimplified instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'iconUrl': instance.iconUrl,
    };

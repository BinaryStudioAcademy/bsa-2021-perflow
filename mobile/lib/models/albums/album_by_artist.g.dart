// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'album_by_artist.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AlbumByArtist _$AlbumByArtistFromJson(Map<String, dynamic> json) {
  return AlbumByArtist(
    id: json['id'] as int,
    name: json['name'] as String,
    releaseYear: json['releaseYear'] as int?,
    iconURL: json['iconURL'] as String?,
    authorName: json['authorName'] as String,
  );
}

Map<String, dynamic> _$AlbumByArtistToJson(AlbumByArtist instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'iconURL': instance.iconURL,
      'releaseYear': instance.releaseYear,
      'authorName': instance.authorName,
    };

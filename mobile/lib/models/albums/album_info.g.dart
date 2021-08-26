// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'album_info.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AlbumInfo _$AlbumInfoFromJson(Map<String, dynamic> json) {
  return AlbumInfo(
    id: json['id'] as int,
    name: json['name'] as String,
    releaseYear: json['releaseYear'] as int,
    isLiked: json['isLiked'] as bool,
    songs: (json['songs'] as List<dynamic>)
        .map((e) => AlbumSong.fromJson(e as Map<String, dynamic>))
        .toList(),
    iconURL: json['iconURL'] as String?,
    artist: json['artist'] == null
        ? null
        : ArtistSimplified.fromJson(json['artist'] as Map<String, dynamic>),
    group: json['group'] == null
        ? null
        : GroupSimplified.fromJson(json['group'] as Map<String, dynamic>),
  );
}

Map<String, dynamic> _$AlbumInfoToJson(AlbumInfo instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'iconURL': instance.iconURL,
      'artist': instance.artist,
      'group': instance.group,
      'releaseYear': instance.releaseYear,
      'isLiked': instance.isLiked,
      'songs': instance.songs,
    };

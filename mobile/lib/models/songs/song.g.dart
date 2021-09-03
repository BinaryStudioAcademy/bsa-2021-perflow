// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'song.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Song _$SongFromJson(Map<String, dynamic> json) {
  print(json['duration']);

  return Song(
    id: json['id'] as int,
    name: json['name'] as String,
    artist: json['artist'] == null
        ? null
        : ArtistSimplified.fromJson(json['artist'] as Map<String, dynamic>),
    album: AlbumSimplified.fromJson(json['album'] as Map<String, dynamic>),
    group: json['group'] == null
        ? null
        : GroupSimplified.fromJson(json['group'] as Map<String, dynamic>),
    duration: 1,
    blobId: json['blobId'] as String?,
    isLiked: true,
  );
}

Map<String, dynamic> _$SongToJson(Song instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'artist': instance.artist,
      'album': instance.album,
      'group': instance.group,
      'duration': instance.duration,
      'blobId': instance.blobId,
      'isLiked': instance.isLiked,
    };

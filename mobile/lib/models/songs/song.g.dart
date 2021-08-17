// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'song.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Song _$SongFromJson(Map<String, dynamic> json) {
  return Song(
    id: json['id'] as int,
    name: json['name'] as String,
    artist: ArtistSimplified.fromJson(json['artist'] as Map<String, dynamic>),
    album: AlbumSimplified.fromJson(json['album'] as Map<String, dynamic>),
    duration: json['duration'] as int,
    blobId: json['blobId'] as String,
    isLiked: json['isLiked'] as bool,
  );
}

Map<String, dynamic> _$SongToJson(Song instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'artist': instance.artist,
      'album': instance.album,
      'duration': instance.duration,
      'blobId': instance.blobId,
      'isLiked': instance.isLiked,
    };

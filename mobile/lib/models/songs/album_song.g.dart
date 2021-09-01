// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'album_song.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

AlbumSong _$AlbumSongFromJson(Map<String, dynamic> json) {
  return AlbumSong(
    id: json['id'] as int,
    name: json['name'] as String,
    artist: json['artist'] == null
        ? null
        : ArtistSimplified.fromJson(json['artist'] as Map<String, dynamic>),
    group: json['group'] == null
        ? null
        : GroupSimplified.fromJson(json['group'] as Map<String, dynamic>),
    album: AlbumSimplified.fromJson(json['album'] as Map<String, dynamic>),
    duration: json['duration'] as int,
    isLiked: json['isLiked'] as bool,
  );
}

Map<String, dynamic> _$AlbumSongToJson(AlbumSong instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'artist': instance.artist,
      'group': instance.group,
      'album': instance.album,
      'duration': instance.duration,
      'isLiked': instance.isLiked,
    };

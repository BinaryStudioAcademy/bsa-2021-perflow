// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'playlist_song.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

PlaylistSong _$PlaylistSongFromJson(Map<String, dynamic> json) {
  return PlaylistSong(
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

Map<String, dynamic> _$PlaylistSongToJson(PlaylistSong instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'artist': instance.artist,
      'album': instance.album,
      'group': instance.group,
      'duration': instance.duration,
      'isLiked': instance.isLiked,
    };

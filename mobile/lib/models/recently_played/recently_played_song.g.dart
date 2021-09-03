// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'recently_played_song.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

RecentlyPlayedSong _$RecentlyPlayedSongFromJson(Map<String, dynamic> json) {
  return RecentlyPlayedSong(
    id: json['id'] as int,
    name: json['name'] as String,
    artist: json['artist'] == null
        ? null
        : ArtistSimplified.fromJson(json['artist'] as Map<String, dynamic>),
    group: json['group'] == null
        ? null
        : GroupSimplified.fromJson(json['group'] as Map<String, dynamic>),
    album: AlbumSimplified.fromJson(json['album'] as Map<String, dynamic>),
    playlist: json['playlist'] == null
        ? null
        : PlaylistSimplified.fromJson(json['playlist'] as Map<String, dynamic>),
  );
}

Map<String, dynamic> _$RecentlyPlayedSongToJson(RecentlyPlayedSong instance) =>
    <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'artist': instance.artist,
      'group': instance.group,
      'album': instance.album,
      'playlist': instance.playlist,
    };

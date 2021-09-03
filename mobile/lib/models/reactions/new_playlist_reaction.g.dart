// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'new_playlist_reaction.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

NewPlaylistReaction _$NewPlaylistReactionFromJson(Map<String, dynamic> json) {
  return NewPlaylistReaction(
    userId: json['userId'] as int,
    playlistId: json['playlistId'] as int,
  );
}

Map<String, dynamic> _$NewPlaylistReactionToJson(
        NewPlaylistReaction instance) =>
    <String, dynamic>{
      'userId': instance.userId,
      'playlistId': instance.playlistId,
    };

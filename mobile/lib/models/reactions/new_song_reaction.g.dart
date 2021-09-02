// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'new_song_reaction.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

NewSongReaction _$NewSongReactionFromJson(Map<String, dynamic> json) {
  return NewSongReaction(
    userId: json['userId'] as int,
    songId: json['songId'] as int,
  );
}

Map<String, dynamic> _$NewSongReactionToJson(NewSongReaction instance) =>
    <String, dynamic>{
      'userId': instance.userId,
      'songId': instance.songId,
    };

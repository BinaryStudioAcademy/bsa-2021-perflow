// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'new_album_reaction.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

NewAlbumReaction _$NewAlbumReactionFromJson(Map<String, dynamic> json) {
  return NewAlbumReaction(
    userId: json['userId'] as int,
    albumId: json['albumId'] as int,
  );
}

Map<String, dynamic> _$NewAlbumReactionToJson(NewAlbumReaction instance) =>
    <String, dynamic>{
      'userId': instance.userId,
      'albumId': instance.albumId,
    };

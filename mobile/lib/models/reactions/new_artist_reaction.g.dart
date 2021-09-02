// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'new_artist_reaction.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

NewArtistReaction _$NewArtistReactionFromJson(Map<String, dynamic> json) {
  return NewArtistReaction(
    userId: json['userId'] as int,
    artistId: json['artistId'] as int,
  );
}

Map<String, dynamic> _$NewArtistReactionToJson(NewArtistReaction instance) =>
    <String, dynamic>{
      'userId': instance.userId,
      'artistId': instance.artistId,
    };

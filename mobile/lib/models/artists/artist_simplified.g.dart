// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'artist_simplified.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ArtistSimplified _$ArtistSimplifiedFromJson(Map<String, dynamic> json) {
  return ArtistSimplified(
    id: json['id'] as int,
    userName: json['userName'] as String,
    iconURL: json['iconURL'] as String?,
  );
}

Map<String, dynamic> _$ArtistSimplifiedToJson(ArtistSimplified instance) =>
    <String, dynamic>{
      'id': instance.id,
      'userName': instance.userName,
      'iconURL': instance.iconURL,
    };
